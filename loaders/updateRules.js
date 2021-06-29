const lawsPerEmbed = 8

function sendRules(client, disc, msg){
	client.data.rules.getAllRules(client)
	.then(rules => {
		let embed = new disc.MessageEmbed()
		.setTitle("***__SERVER LAWS:__***")
		for(let r of rules){
			if(r.id % lawsPerEmbed == 1 && r.id != 1){
				client.utils.getChannel(msg, client.channelId.rules).send(embed);
				embed = new disc.MessageEmbed()
				.setColor('#9aedea') // Give it a color in hexidecimal format
			}else{
				let extra = "";
				if(r.corelaw == 1){
					extra = "_- CORELAW_"
				}
				embed.addFields({
					name: "\u200b",
					value: "\u200b"},
				{
					name: `**__#${r.id}. ${r.rule_name}__** ${extra}`,
					value: "*" + r.rule_desc + "*",
					inline: true},
				{
					name: "**__Added:__**",
					value: "*" + r.rule_date + "*",
					inline: true})
			}
		}
		embed.setFooter("Abide by the law!");
		client.utils.getChannel(msg, client.channelId.rules).send(embed);
	})
}

module.exports = {
	update: function(client, disc, msg){
		client.utils.clearChat(msg, 5, client.channelId.rules)
		client.sleep(1000).then(() => {
			sendRules(client, disc, msg)
		})
	}
}