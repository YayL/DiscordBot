module.exports = (client, disc) => {

	client.con.query(`SELECT * FROM users WHERE job_xp > ${client.data.jobs.totalLvlXp(client.s.LB_LEVEL_MIN)-1} ORDER BY job_xp DESC LIMIT ${client.s.LB_SIZE}`, (e, {rows}) => {
		if(e) 
			console.error(e);
			
		client['cachedLevelLB'] = rows;
	});

	client.data.bal.updateTotalMoney(client);

	client.con.query(`SELECT * FROM users WHERE bal > ${client.s.LB_MONEY_MIN-1} ORDER BY bal DESC LIMIT ${client.s.LB_SIZE}`, (e, {rows}) => {
		if(e) 
			console.error(e);

		client['cachedMoneyLB'] = rows;
		client.leaderboardTimer = Date.now();
	});
}
