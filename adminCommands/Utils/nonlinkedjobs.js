var jobs = require('../../info/Jobs.js')

module.exports = {
	name: "Nonlinkedjobs",
	alias: ["nlj"],
	use: "-Nonlinkedjobs",
	description: "Look through all jobs to see if any are not linked to previous jobs",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		try{
      var nonLinkedJobs = [], list = [], found_jobs = 0;

      for(var i = jobs.length-1; i > 0; i--){
        for(previousJob of jobs[i-1]){
          for(jobToPromoteTo of previousJob.job_options){
            for(currentJob of jobs[i]){
              if(currentJob.name == jobToPromoteTo && !list.includes(currentJob.name)) {
                list.push(currentJob.name)
                break;
              }
            }
          }
        }

        if(list.length !== 0){
          for(j of jobs[i]){
            if(!list.includes(j.name)){
              found_jobs++
              nonLinkedJobs.push(j.name)
            }
          }
        }
        list = [];
      }

      var text = `***__Here is the list:__*** \n` + nonLinkedJobs.join('\n')

      client.msg.reply(msg, `Non Linked Up Jobs: ${found_jobs}`, text, disc)
      console.log('finished')

    }catch(e){
        client.eventEm.emit('CommandError', msg, this.name, args, e)
    }
	}
}
