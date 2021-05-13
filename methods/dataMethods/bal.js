function setBalance(plr, amount, client){
	client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
		try{
			if(e) throw e;
			if(amount>client.maxMoney) amount = client.maxMoney
			if(amount<0) amount=0

			let sql;

			if(rows.length < 1){
				sql = `INSERT INTO user (id, bal) VALUES ('${plr.id}', ${amount})`
			}else{
				sql = `UPDATE user SET bal = ${amount} WHERE id = '${plr.id}'`
			}

			client.con.query(sql);
		}catch(e){
			client.m.msg.log(client.guild, e)
		}
		
	});
}

module.exports = {
    updateUserBalance(client, plr, amount, type) {
    	try{
    		if(plr == undefined) return

			amount = client.m.utils.suffixCheck(amount.toString(), true)
			if(!amount) return;

			if(type == "add"){
				this.getBalance(client, plr)
				.then(a => {
					setBalance(plr, a+amount, client);
				});
			}else{
				setBalance(plr, amount, client);
			}
    	}catch(e){
    		client.m.msg.log(client.guild, e)
    	}
	},

	getBalance: (client, plr) => {
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
		}).catch(e => {
			client.m.msg.log(client.guild, e)
		})
	},

	updateTotalMoney(client){
		try{
			client.con.query(`SELECT * FROM user`, (e, rows) => {
	            if(e) return 
	            if(!rows.length) return client.totalMoney = 0

	            let money = 0

	            for(row of rows){
	                money += row.bal
	            }
	            client.totalMoney = money
	        })
    	}catch(e){
    		client.m.msg.log(client.guild, e)
    	}
       
    },

	updateLB(client){
    	this.updateTotalMoney(client);
		return new Promise(resolve => {
			client.con.query(`SELECT * FROM user WHERE bal > ${client.s.lbMinimum-1} ORDER BY bal DESC LIMIT ${client.s.lbSize}`, (e, rows) => {
				if(e) console.error(e);
				client.cachedLB = rows
				client.timer.leaderboard = Date.now()
				resolve();
			});
		}).catch(e => {
			client.m.msg.log(client.guild, e)
		})
	},

	async enoughMoney(client, plr, amount){
		try{
			const balance = await client.m.data.bal.getBalance(client, plr)
	        if(balance<amount) return client.eventEm.emit('NotEnoughMoney', msg, plr, (amount-balance));
	        return true;
    	}catch(e){
    		client.m.msg.log(client.guild, e)
    	}
    	
	}
}