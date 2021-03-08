function setBalance(plr, amount, client){
	client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
		if(e) throw e;
		if(amount>9223372036854775000) amount = 9223372036854775000
		if(amount<0) amount=0

		let sql;

		if(rows.length < 1){
			sql = `INSERT INTO user (id, bal) VALUES ('${plr.id}', ${amount})`
		}else{
			sql = `UPDATE user SET bal = ${amount} WHERE id = '${plr.id}'`
		}

		client.con.query(sql);
	})
}

module.exports = {
    updateUserBalance(client, plr, amount, type) {

		if(plr == undefined){return}
		amount = Number(amount);
		if(isNaN(amount)){return}

		if(type == "add"){
			this.getBalance(client, plr)
			.then(a => {
				setBalance(plr, a+amount, client);
			});
		}else{
			setBalance(plr, amount, client);
		}
			
	},

	getBalance: (client, plr) => {
		try{
			return new Promise(resolve => {
				client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
					if(e) throw e;
					if(rows[0] == undefined){
						setBalance(plr, 0, client);
						resolve("0")
					}else{
						resolve(rows[0].bal);
					}
				});
			});
		}catch(e){
			console.log(e);
		}
	},

	updateLB: (client) => {
		try{
			return new Promise(resolve => {
				client.con.query(`SELECT * FROM user WHERE bal > ${client.lbMinimum-1} ORDER BY bal DESC LIMIT ${client.lbSize}`, (e, rows) => {
					if(e) throw e;
					client.cachedLB = rows
					client.timer.currentTime.leaderboard = Date.now()
					resolve();
				});
			});
		}catch(e){
			console.log(e);
		}
	},

	updateTotalMoney(client){
        client.con.query(`SELECT * FROM user`, (e, rows) => {
            if(e) return console.error(e)
            if(!rows.length) return client.totalMoney = 0

            let money = 0

            for(row of rows){
                money += row.bal
            }
            client.totalMoney = money
        })
    },

	async enoughMoney(client, plr, amount){
    	const balance = await client.m.data.bal.getBalance(client, plr)
        if(balance<amount) return client.eventEm.emit('NotEnoughMoney', msg, plr, (amount-balance));
        return true;
	}
}