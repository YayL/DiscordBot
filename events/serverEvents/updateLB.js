module.exports = (client, disc, version) => {
	var info, min, cache;
		if(version=='lvl'){
			info ='job_xp'
			min = client.data.jobs.totalLvlXp(client.s.lbLevelMin)
			cache = 'cachedLevelLB'
		}else{
			client.data.bal.updateTotalMoney(client);
			info='bal'
			min=client.s.lbMoneyMin
			cache = 'cachedMoneyLB'
		}
		return new Promise(resolve => {
			client.con.query(`SELECT * FROM user WHERE ${info} > ${min-1} ORDER BY ${info} DESC LIMIT ${client.s.lbSize}`, (e, rows) => {
				if(e) console.error(e);
				client[cache] = rows
				client.timer.leaderboard = Date.now()
				resolve();
			});
		}).catch(e => {
			client.msg.log(client.guild, e)
		})
}