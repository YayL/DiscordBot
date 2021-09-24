const jobs = require('./../../info/Jobs.js');

module.exports = (client, disc) => {

    for(let i = 0; i < jobs.length; i++){
        for(let job of jobs[i]){
            client.jobList.set(job.name, {base_pay: job.base_pay, requirement: i+1, job_options: job.job_options});
        }
    }
    client.highestJobRequirement = jobs.length;
    client.msg.log("INFO", `Jobs: ${client.jobList.array().length}`);

    client.achivementList = require('./../../info/Achivements.js');
    client.msg.log("INFO", `Achivements: ${client.achivementList.length}`);
    
    client.items = require('./../../info/Items.js');
    client.itemAmount = client.data.items.countItems(client);
    client.msg.log("INFO", `Items: ${client.itemAmount}`);

    client.totalMoney = client.data.bal.updateTotalMoney(client);
    client.eventEm.emit('updateLB');
    client.eventEm.emit('updateLB', 'lvl');
    
    client.msg.log("INFO", 'Yeah, yeah! I am up...');
}
