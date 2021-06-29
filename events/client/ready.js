const jobs = require('./../../info/Jobs.js')

module.exports = (client, disc) => {
	console.log('Yeah, yeah! I am up...')

	for(var i=0; i<jobs.length;i++){
		for(job of jobs[i]){
			client.jobList.set(job.name, {base_pay: job.base_pay, requirement: i, job_options: job.job_options})
		}
	}
	client.highestJobRequirement = jobs.length
	console.log(`Jobs loaded: ${client.jobList.array().length}`)

	client.totalMoney = client.data.bal.updateTotalMoney(client)
}
