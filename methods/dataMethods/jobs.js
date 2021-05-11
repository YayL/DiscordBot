module.exports = {

    createJob(client, name, base_pay, job_level_requirement, upgrade_job_options) {
        sql = `INSERT INTO jobs (name, base_pay, job_level_requirement, upgrade_job_options) VALUES ('${name}', ${base_pay}, ${job_level_requirement}, '${upgrade_job_options.join(',')}')`
        client.con.query(sql);
    },

    nextLvlXp(lvl){
        return 100*lvl*lvl*lvl;
    },

    totalLvlXp(lvl){
        return Math.pow(10*(lvl*(lvl+1)/2), 2)
    },

    xpToLevel(xp){
        if (xp <= 100) return 1; 
        return Math.floor(Math.sqrt(2*Math.sqrt(xp)/10 + 0.25) - 0.5)+1
    }
}