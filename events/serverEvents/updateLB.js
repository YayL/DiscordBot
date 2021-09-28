module.exports = (client, disc) => {

    client.con.query(`SELECT * FROM users WHERE experience > ${client.data.jobs.totalLevelExp(client.s.LB_LEVEL_MIN)-1} ORDER BY experience DESC LIMIT ${client.s.LB_SIZE}`, (e, result) => {
        if(e) 
			client.msg.log('ERR', e);
        
		if(result.rowCount != 0)
        	client['cachedLevelLB'] = result.rows;
    });

    client.data.bal.updateTotalMoney(client);

    client.con.query(`SELECT * FROM users WHERE bank > ${client.s.LB_MONEY_MIN-1} ORDER BY bank DESC LIMIT ${client.s.LB_SIZE}`, (e, result) => {
        if(e) 
			client.msg.log('ERR', e);

		if(result.rowCount != 0)
			client['cachedMoneyLB'] = result.rows;
	});

	client.con.query(`SELECT * FROM users WHERE rebirths > ${client.s.LB_REBIRTH_MIN-1} ORDER BY rebirths DESC LIMIT ${client.s.LB_SIZE}`, (e, result) => {
		if(e) 
			client.msg.log('ERR', e);

		if(result.rowCount != 0)
			client['cachedRebirthLB'] = result.rows;
	});

	client.con.query(`SELECT * FROM gangs WHERE experience > ${client.data.jobs.totalLevelExp(client.s.LB_GANGLEVEL_MIN)-1} ORDER BY experience DESC LIMIT ${client.s.LB_SIZE}`, (e, result) => {
		if(e) 
			client.msg.log('ERR', e);

		if(result.rowCount != 0)
			client['cachedGangLB'] = result.rows;

		client.leaderboardTimer = Date.now();
	});
}
