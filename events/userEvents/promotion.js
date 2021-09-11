module.exports = async (client, disc, user, job) => {
	client.con.query(`UPDATE users SET job_name = '${job}' WHERE id = '${user.id}'`);
}