module.exports = async (client, disc, user, job) => {
    client.con.query(`UPDATE users SET job = '${job}' WHERE id = '${user.id}'`);
    if(Object.keys(client.userCache).includes(user.id))
        client.userCache[user.id].job = job;
}