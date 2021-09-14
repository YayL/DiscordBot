module.exports = async (client, disc, channel, user, achivement) => {
	try{
		if(achivement == undefined) return
		var achivements = await client._user.get(client, user.id, 'achivements');

		const hasAchivements = achivements.includes(achivement.index);

		if(!hasAchivements && achivement != undefined){
			const embed = new disc.MessageEmbed()
				.setTitle(`**__New Achivement:__** *${achivement.name}*`)
				.addField('\u200b',`*${achivement.message}*`)
				.setColor('#a87f32');

			channel.send(embed);

			achivements.push(achivement.index);

			client.con.query(`UPDATE users SET achivements = '${JSON.stringify(achivements)}' WHERE id = '${user.id}'`);

			achivement.run(client, user);
		}
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
