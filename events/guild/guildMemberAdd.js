module.exports = (client, disc, member) => {
	try{
		client._user.resetUser(client, member.id);
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
