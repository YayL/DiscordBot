module.exports = {
    isInviteOnly(client, settings){
        return settings['INVITE_ONLY'] == true;
    },

    isInvited(client, info, user_id){
        return info['INVITE_LIST'].includes(user_id);
    },

    addToInviteList(client, gang, user_id){
        var info = gang.info;
        info['INVITE_LIST'].push(user_id);
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${gang.name}'`);
    },

    remFromInviteList(client, gang, user_id){
        var info = gang.info;
        info['INVITE_LIST'].splice(info['INVITE_LIST'].indexOf(user_id), 1);
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${gang.name}'`);
    },
}