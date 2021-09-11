module.exports = {

	updateTotalMoney(client){
		try{
			client.con.query(`SELECT * FROM users`, (e, {rows}) => {
	            if(e) 
					return;

	            if(!rows.length) 
					return client.totalMoney = 0;

	            let money = 0

	            for(row of rows)
	                money += row.bal;
	            
	            client.totalMoney = money;
	        })
    	}catch(e){
    		client.msg.log(client.guild, e);
    	}

    },
}
