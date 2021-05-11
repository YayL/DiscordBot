module.exports = async (client, disc, user, channel) => {

    const rebirth = await client.m.data.user.resetUser(client, user, true)

    client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `L${rebirth}`));
}