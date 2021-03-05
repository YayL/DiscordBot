module.exports = (client, disc, member) => {
	try{
		client.con.query(`SELECT * FROM user WHERE id = ${member.id}`, (e, rows) => {
			if(e) return;
			if(rows[0]) return;
			console.log(rows);
			client.con.query(`INSERT INTO user (id) VALUES (${member.id})`)
		});
	}catch(e){
		client.con.query(`INSERT INTO user (id) VALUES (${member.id})`)
	}
}