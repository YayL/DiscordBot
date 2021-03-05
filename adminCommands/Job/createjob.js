module.exports = {
	name: "CreateJob",
	alias: ["cjob"],
	use: "-CreateJob [Job Title] [Base_Pay] [Job_Level] (List Of Jobs to upgrade to)",
	description: "Add a Job",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		const name = args[0]
		const base_pay = Number(args[1])
		const job_level = Number(args[2])
		const upgrade_job_name_options = args.slice(3)
		client.m.data.jobs.createJob(client, name, base_pay, job_level, upgrade_job_name_options);
	}
}