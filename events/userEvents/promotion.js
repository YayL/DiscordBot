module.exports = async (client, disc, user, job) => {
    
    client._user.set(client, user.id, 'job', job);
    
}