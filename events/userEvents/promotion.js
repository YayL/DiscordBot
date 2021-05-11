module.exports = async (client, disc, user, job) => {
	client.con.query(`UPDATE user SET job_name = '${job}' WHERE id = '${user.id}'`);
}