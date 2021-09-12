module.exports = (client, disc, version) => {
	var info, min, cache;

	if(version=='lvl'){
		info ='job_xp';
		min = client.data.jobs.totalLvlXp(client.s.LB_LEVEL_MIN);
		cache = 'cachedLevelLB';
	}
	else{
		client.data.bal.updateTotalMoney(client);
		info = 'bal';
		min = client.s.LB_MONEY_MIN;
		cache = 'cachedMoneyLB';
	}

	return new Promise(resolve => {
		client.con.query(`SELECT * FROM users WHERE ${info} > ${min-1} ORDER BY ${info} DESC LIMIT ${client.s.LB_SIZE}`, (e, {rows}) => {
			if(e) 
				console.error(e);
			client[cache] = rows;
			client.leaderboardTimer = Date.now();
			resolve();
		});
	}).catch(e => {
		client.msg.log("ERR", e, client.guild);
	})
}
