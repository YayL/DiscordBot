module.exports = async (client, disc, user, channel, rebirth=false) => {

    if(!rebirth){
    	rebirth = await client.data.user.get(client, user, 'rebirths')+1;


    	client.data.user.resetUser(client, user, true);
    } 

    client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `R${rebirth}`));
}