module.exports = async (client, disc, channel, user, achivement, achivements = false) => {
	try{
		if(achivement == undefined) return;

		achivements = !achivements ? (await client._user.get(client, user.id)).achivements : achivements

		if(achivements == null)
			achivements = [];

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

			if(achivement['child'] != undefined) 
				client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(a => a.index == achivement['child']), achivements);
		}
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
