module.exports = (client, disc, member) => {
	try{
		client.con.query(`SELECT * FROM user WHERE id = ${member.id}`, (e, rows) => {
			client.con.query(`INSERT INTO user (id, achivements) VALUES (${member.id}, '')`)
		});
	}catch(e){
		client.msg.log(client.guild, e)
	}
}
