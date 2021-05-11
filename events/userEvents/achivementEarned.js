module.exports = async (client, disc, channel, user, achivement) => {

	const userAchivementList = await client.m.data.user.get(client, user, 'achivements');
	const hasAchivements = userAchivementList?.split(',').some(a => a === achivement?.index.toString());

	if(!hasAchivements && achivement != undefined){
		const embed = new disc.MessageEmbed()
	        .setTitle(`**__New Achivement:__** *${achivement.name}*`)
	        .addField('\u200b',`*${achivement.message}*`)
	        .setColor('#a87f32')

    	channel.send(embed);

    	client.con.query(`UPDATE user SET achivements = '${userAchivementList+`,${achivement.index}`}' WHERE id = '${user.id}'`)

		achivement?.run(client, user);
	}
	
}