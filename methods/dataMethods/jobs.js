module.exports = {
    createJob(client, msg, name, base_pay, job_level_requirement, upgrade_job_options) {
        sql = `INSERT INTO jobs (name, base_pay, job_level_requirement, upgrade_job_options) VALUES ('${name}', ${base_pay}, ${job_level_requirement}, '${upgrade_job_options.join(',')}')`
        client.con.query(sql);

        client.con.query(`SELECT * FROM jobs`, (e, rows) => {
            if(e) throw e;
            console.log(rows);
        });
    }
}