module.exports = {

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
    		client.msg.log(client.guild, e)
    	}

    },

	async enoughMoney(client, msg, user, amount){
		try{
			const balance = await client.data.user.getBalance(client, user)
	        if(balance<amount){
	        	client.eventEm.emit('NotEnoughMoney', msg, user, (amount-balance));
	        	return false;
	        } 
	        return true;
    	}catch(e){
    		client.msg.log(client.guild, e)
    	}

	}
}
