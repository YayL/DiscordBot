module.exports = {

	updateTotalMoney(client){
		try{
			client.con.query(`SELECT * FROM users`, (e, {rows}) => {
	            if(e) 
					return;

	            if(!rows.length) 
					return client.totalMoney = 0;

	            var money = 0

	            for(let row of rows){
					money += Number(row.bal);
				}
	                
	            client.totalMoney = money;
	        })
    	}catch(e){
    		client.msg.log("ERR", e, client.guild);
    	}

    },
}
