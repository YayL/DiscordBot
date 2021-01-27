module.exports = {
	updateUserBalance(client, player, amount, type){
		if(plr == undefined){return}
		amount = Number(amount);

		client.con.query(`SELECT * FROM bal WHERE id = '${plr.id}'`, (e, rows) => {
			if(e) throw e;


			if(type == "add"){

			}else if(type == "rem"){

			}

			let sql;

			if(rows.length < 1){
				sql = `INSERT INTO bal (id, bal) VALUES ('${plr.id}', ${amount})`
			}else{
				sql = `UPDATE bal SET bal = ${amount} WHERE id = ${plr.id}`
			}

			client.con.query(sql);
		})
	},

	getUserBalance: (client, player) => {
		try{
			return new Promise(resolve => {
				client.con.query(`SELECT * FROM bal WHERE id = '${player.id}'`, (e, rows) => {
					if(e) throw e;
					resolve(rows[0].bal);
				});
			});
		}catch(e){
			console.log(e);
		}
	}
}