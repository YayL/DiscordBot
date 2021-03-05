module.exports = {
	name: "UpdateJobs",
	alias: ["ujobs"],
	use: "-UpdateJobs",
	description: "Update job list",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		client.con.query(`SELECT * FROM jobs`, (e, rows) => {
            if(e) console.error(e);
        
            for(row of rows){
                client.jobList.set(row.name, {base_pay: row.base_pay, requirement: row.job_level_requirement, job_options: row.upgrade_job_options})
            }
            for(row of client.jobList.array()){
            	console.log(row);
			}
        })
	}
}