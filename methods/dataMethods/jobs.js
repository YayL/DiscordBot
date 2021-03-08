module.exports = {

    createJob(client, name, base_pay, job_level_requirement, upgrade_job_options) {
        sql = `INSERT INTO jobs (name, base_pay, job_level_requirement, upgrade_job_options) VALUES ('${name}', ${base_pay}, ${job_level_requirement}, '${upgrade_job_options.join(',')}')`
        client.con.query(sql);
    },

    levelToXP(lvl){
        return Math.pow(lvl, 4)*25 + 100*lvl*lvl - 125
    },
    xpToLevel(xp){
        if (xp == 0) return 1; 
        testLvl = 0
        for (tempXp=0; tempXp <= xp; testLvl++){
            tempXp = this.levelToXP(testLvl+1)
        }
        return testLvl-1
    }
}