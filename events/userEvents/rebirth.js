module.exports = async (client, disc, user, channel, rebirth=false) => {

    if(!rebirth){
    	const achivements = await client.m.data.user.get(client, user, 'achivements');
    	rebirth = await client.m.data.user.get(client, user, 'rebirths');


    	client.m.data.user.resetUser(client, user).then(_ => {
    		client.con.query(`UPDATE user SET rebirths = ${rebirth+1} WHERE id = '${user.id}'`)
    		client.con.query(`UPDATE user SET achivements = '${achivements}' WHERE id = '${user.id}'`)
    	});
    } 

    client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `R${rebirth}`));
}