module.exports = {

    addExp(client, msg, gang, experience){
        if(experience + Number(gang.experience) > client.s.MAX_XP)
            experience = client.s.MAX_XP - Number(gang.experience)

        if(experience + Number(gang.experience) < 0)
            experience = -Number(gang.experience)

        client.con.query(`UPDATE gangs SET experience = experience + ${experience} WHERE name = '${gang.name}'`);

        if(client.data.jobs.expToLevel(Number(gang.experience)) != client.data.jobs.expToLevel(Number(gang.experience) + experience)){
            client.eventEm.emit('gangLevelUp', msg, gang, experience)
        }

    }

}