module.exports = (client, disc, member) => {
	try{
		client._user.addUserToDatabase(client, member.id);
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
