const s = require('../../info/settings.js')

module.exports = {

    createJob(client, name, base_pay, job_level_requirement, upgrade_job_options) {
        try{
            sql = `INSERT INTO jobs (name, base_pay, job_level_requirement, upgrade_job_options) VALUES ('${name}', ${base_pay}, ${job_level_requirement}, '${upgrade_job_options}')`
            client.con.query(sql);
        }catch(e){
            client.m.msg.log(client.guild, e)
        }
        
    },

    nextLvlXp(lvl, calculate=false){
        if(!calculate && lvl > s.maxLevel && lvl%s.maxLevel !== 0) return "Max"
        return 100*Math.pow(lvl+1,3);
    },

    totalLvlXp(lvl, calculate=false){
        if(!calculate && lvl > s.maxLevel && lvl%s.maxLevel !== 0) return Math.pow(10*(s.maxLevel*(s.maxLevel+1)/2), 2)
        return Math.pow(10*((lvl+1)*(lvl+2)/2), 2)
    },

    xpToLevel(xp, calculate=false){
        const lvl = Math.floor(Math.sqrt(2*Math.sqrt(xp)/10 + 0.25) - 0.5)
        if (!calculate && lvl > s.maxLevel && lvl%s.maxLevel !== 0) return "Max"
        return lvl
    }
}