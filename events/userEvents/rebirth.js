module.exports = async (client, disc, user, channel, rebirth=false) => {

    if(!rebirth){
    	rebirth = await client._user.get(client, user.id, 'rebirths') + 1;

    	client._user.resetUser(client, user.id, true);
    } 

    client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `R${rebirth}`));
}