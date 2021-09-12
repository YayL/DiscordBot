module.exports = {
	name: "MyMarket",
	alias: ["mm"],
	use: `-Mymarket`,
	description: "Get a list of your listings and the posibility to remove them",
	options: {ShowInHelp: true, Category: "Economy"},
	run: async function(client, msg, args, discord){
		try{
			
			client.con.query(`SELECT * FROM market WHERE userid = '${msg.author.id}'`, (e, {rows}) => {
				sendMessage(client, msg, discord, rows);
			})

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

function sendMessage(client, msg, discord, marketTable){
	const embed = new discord.MessageEmbed()
		.setTitle(`Your Market Listings:`)
		.setFooter(`Press the reactions below to remove a listing!`);
	
	for(let index = 0; index < marketTable.length; index++){
		let hasExpired = false;
		
		if(marketTable[index].deadline*1000 <= Date.now()){
			client.data.market.remove(client, marketTable[index]);
			hasExpired = true;
		}

		const item = client.data.items.getItem(client, marketTable[index].item_id), 
			time = client.utils.timeFormat(Math.ceil(marketTable[index].deadline - (Date.now()/1000)));
		
		if(index != 0 && index % 2 == 0 ){
			embed.addFields({
				name:'\u200b',
				value:'\u200b'
			});
		}

		embed.addFields({
			name: `${client.s.EMOJIS[index]} : (${item.tier}) ${client.utils.fixNumber(marketTable[index].amount)} ${item.name}`,
			value: `\u200b\n💰Price: **${client.utils.fixNumber(marketTable[index].price, true)}**
				${hasExpired ? '**EXPIRED' : `⏳Ending in **${time}`}**`,
			inline: true 
		});
	}

	msg.channel.send(embed)
		.then(Message => {
			handleMessageReactions(client, Message, marketTable, msg.author.id)
		})
}

function handleMessageReactions(client, msg, marketTable, commandExecutor_id){

	const filter = (reaction, user) => {
		let index = client.s.EMOJIS.indexOf(reaction.emoji.name);

		if(user.id == commandExecutor_id && index != -1){
			client.data.market.remove(client, marketTable[index]);
		}
		return false;
	}

	msg.awaitReactions(filter, {time: 45000})
		.then(_ => {
			if(!msg.deleted)
				msg.delete();
		});

	for(let i = 0; i < marketTable.length; i++){
		msg.react(client.s.EMOJIS[i]).catch(e => {return});
	}

}