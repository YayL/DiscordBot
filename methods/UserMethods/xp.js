module.exports = {
    async setExp(client, msg, user_id, experience, set_work_timer=false, add=false){
        try{
            const previous_experience = await client._user.get(client, user_id).experience;

            if(add) 
                experience += Number(experience);
            if(experience > client.s.MAX_XP) 
                experience = client.s.MAX_XP;
            if(experience < 0) 
                experience = 0;

            if(set_work_timer) 
                client.data.cooldown.addUserToCooldown(client, msg.author.id, 'work');

            client._user.set(client, user_id, 'experience', experience);

            client.eventEm.emit('userLevelUP', msg.channel, user_id, experience, previous_experience);
        }catch(e){
            client.msg.log("ERR", e, client.guild);
        }
    },

    addExp(client, msg, user_id, experience, set_work_timer=false){
        this.setExp(client, msg, user_id, experience, set_work_timer, true);
    },
}
