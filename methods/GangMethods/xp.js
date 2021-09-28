module.exports = {

    addExp(client, msg, gang, experience){
        if(experience + Number(gang.xp) > client.s.MAX_XP)
            experience = client.s.MAX_XP - Number(gang.xp)

        if(experience + Number(gang.xp) < 0)
            experience = -Number(gang.xp)

        client.con.query(`UPDATE gangs SET xp = xp + ${experience} WHERE name = '${gang.name}'`);

        if(client.data.jobs.xpToLevel(Number(gang.xp)) != client.data.jobs.xpToLevel(Number(gang.xp) + experience)){
            client.eventEm.emit('gangLevelUp', msg, gang, experience)
        }

    }

}