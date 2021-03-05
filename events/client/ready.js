module.exports = (client, disc) => {
	console.log('Yeah, yeah! I am up...')
	client.con.query(`SELECT * FROM jobs`, (e, rows) => {
		if(e) console.error(e);

		for(row of rows){
			client.jobList.set(row.name, {base_pay: row.base_pay, requirement: row.job_level_requirement, job_options: row.upgrade_job_options})
		}
		client.totalMoney = client.m.data.bal.updateTotalMoney(client)
	})
}