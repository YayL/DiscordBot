const maxListingsPerPage = 10;

async function handleListingMessage(msg, client, embed, marketTable, args){
    try{
        const maxPages = Math.ceil(marketTable.length/maxListingsPerPage),
            page = (Number.isNaN(Number(args[1])) ? 1 : (Number(args[1]) > maxPages ? maxPages : (Number(args[1]) < 1 ? 1 : Number(args[1]))));
        
        if(maxPages == 0){
            embed.setDescription('**None found**')
            return msg.channel.send(embed);
        }
        var loopLength = 0;

        for(var index = maxListingsPerPage*(page-1); index < maxListingsPerPage*page; index++){
            if(index == marketTable.length) 
                break;

            if(marketTable[index].deadline*1000 <= Date.now()){
                client.data.market.remove(client, marketTable[index]);
                continue;
            }

            const item = client.data.items.getItem(client, marketTable[index].item_id), 
                time = client.utils.timeFormat(Math.ceil(marketTable[index].deadline - (Date.now()/1000)));
            
            if(index != maxListingsPerPage*(page-1) && index % 2 == 0 ){
                embed.addFields({
                    name:'\u200b',
                    value:'\u200b'
                });
            }

            let seller = await client.utils.getMember(marketTable[index].user_id, msg)

            embed.addFields({
                name: `${client.s.EMOJIS[loopLength]} : (${item.tier}) ${client.utils.fixNumber(marketTable[index].amount)} ${item.name}`,
                value: `\u200b\n💰Price: **${client.utils.fixNumber(marketTable[index].price, true)}**
                💼Seller: **${seller != null ? seller : 'Unknown'}**
                ⏳Ending in **${time}**`,
                inline: true 
            });

            loopLength++;
        }
        embed.setFooter(`Page ${page}/${maxPages}`);

        msg.channel.send(embed)
            .then(m => {
                listingsReactions(m, msg.author.id, client, marketTable, maxListingsPerPage*(page-1), loopLength);
            });

    }catch(e){
        client.eventEm.emit('CommandError', msg, 'MarketView', args, e);
    }
}

function listingsReactions(msg, commandExecutor_id, client, marketTable, startIndex, length){

    const filter = async (reaction, user) => {
        let index = client.s.EMOJIS.indexOf(reaction.emoji.name) + startIndex;

        if(user.id == commandExecutor_id && index - startIndex != -1){

			if(!await client._user.bal.enoughMoney(client, msg, marketTable[index].price))
				return false;
			

            if(marketTable[index].deadline <= Math.floor(Date.now()/1000)){
                client.eventEm.emit('ExpiredListing', msg, marketTable[index]);
                return false;
            }

            if(user.id == marketTable[index].user_id){
                client.eventEm.emit('ownerBuyer', msg);
                return false;
            }

            client.eventEm.emit('purchaseListing', msg, marketTable[index].id, commandExecutor_id);
        }
        
        return false;
    }

    msg.awaitReactions(filter, {time:35000}).then(m => {
        if(!msg.deleted) 
            msg.delete()
    })

    for(var i = 0; i<length; i++){
        msg.react(client.s.EMOJIS[i]).catch(e => {return});
    }

}

module.exports = {
    name: "MarketView",
    alias: ["mv"],
    use: `-MarketView @[user]
          -MarketView [item_id] [page]
          -MarketView [type] [page]`,
    description: "Get a list of what has been put on the",
    options: {ShowInHelp: true, Category: "Economy"},
    run: async function(client, msg, args, discord){
        try{
            let sql, title;

            if(args.length == 0) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            if(msg.mentions.users.array().length == 1)
            {
                const user_id = msg.mentions.users.array()[0].id;
                sql = `SELECT * FROM market WHERE user_id = '${user_id}' ORDER BY price DESC`;
                title = `${(await client.utils.getMember(msg.mentions.users.array()[0].id, msg)).displayName}'s Market Listings`
            }
            else if(!Number.isNaN(Number(args[0])))
            {
                if(!client.data.items.isItem(client, Number(args[0])))
                    return client.eventEm.emit('ItemNotFound', msg, Number(args[0]));
                sql = `SELECT * FROM market WHERE item_id = ${Number(args[0])} ORDER BY price DESC`;
                title = `${client.data.items.getItem(client, Number(args[0])).name}'s on the Market`;
            }
            else 
            {
                sql = `SELECT * FROM market WHERE tier = '${args[0].toLowerCase()}' ORDER BY price DESC`;
                title = `${args[0]} items on the Market`;
            }

            setupForMessage(client, msg, args, discord, sql, title);

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

function setupForMessage(client, msg, args, discord, sql, title){
    client.con.query(sql, (e, {rows}) => {
        if(e) return client.eventEm.emit('CommandError', msg, 'MarketView', args, e);

        const embed = new discord.MessageEmbed()
            .setTitle(title);

        handleListingMessage(msg, client, embed, rows, args);
    })
    
}
