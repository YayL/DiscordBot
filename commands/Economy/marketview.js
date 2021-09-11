const maxListingsPerPage = 10

function handleListingMessage(msg, client, embed, marketTable, args){
	try{
		const maxPages = Math.ceil(marketTable.length/maxListingsPerPage),
			page = (Number.isNaN(Number(args[1])) ? 1 : (Number(args[1]) > maxPages ? maxPages : (Number(args[1]) < 1 ? 1 : Number(args[1]))));
		
		if(maxPages == 0){
			embed.setDescription('None Found!');
			return msg.channel.send(embed);
		}
		var loopLength = 0;

		for(var index =  maxListingsPerPage*(page-1); index < maxListingsPerPage*page; index++){
			if(index == marketTable.length) 
				break;

			const item = client.data.items.getItem(client, marketTable[index].item_id), 
				time = client.utils.timeFormat(Math.ceil(marketTable[index].deadline - (Date.now()/1000)));
			
			if(index != maxListingsPerPage*(page-1) && index % 2 == 0 ){
				embed.addFields({
					name:'\u200b',
					value:'\u200b'
				});
			}

			embed.addFields({
				name: `${client.s.EMOJIS[loopLength]} : (${item.tier}) ${client.utils.fixNumber(marketTable[index].amount)} ${item.name}`,
				value: `💰Price: ${client.utils.fixNumber(marketTable[index].price, true)}\n⏳Ending in ${time}`,
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
		if(user.id != commandExecutor_id) return false
		let index = client.s.EMOJIS.indexOf(reaction.emoji.name) + startIndex;
		if(index - startIndex == -1) return false

		client.eventEm.emit('purchaseListing', msg, marketTable[index].id, commandExecutor_id);
		return true
	}

	msg.awaitReactions(filter, {time:35000}).then(m => {
		if(!msg.deleted) msg.delete()
	}).catch(e => {
		console.log(e)
	});

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
	run: async function(msg, client, disc, args){
		try{
			let sql, title;

			if(args.length == 0) 
				return client.eventEm.emit('InvalidArgs', msg, this.use);

			if(msg.mentions.users.array().length == 1)
			{
				const user_id = msg.mentions.users.array()[0].id;
				sql = `SELECT * FROM market WHERE userid = '${user_id}' ORDER BY price DESC`;
				title = `${(await client.utils.getMember(user_id, msg)).displayName}'s Market Listings`
			}
			else if(!Number.isNaN(Number(args[0])))
			{
				sql = `SELECT * FROM market WHERE item_id = ${Number(args[0])} ORDER BY price DESC`;
				title = `${client.data.items.getItem(client, Number(args[0])).name}'s on the Market`;
			}
			else 
			{
				sql = `SELECT * FROM market WHERE tier = '${args[0].toLowerCase()}' ORDER BY price DESC`;
				title = `${args[0]} items on the Market`;
			}

			setupForMessage(client, msg, args, disc, sql, title);

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
