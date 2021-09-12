module.exports = {
	async setXP(client, msg, user_id, xp, set_work_timer=false, add=false){
        try{
            const job_xp = await client._user.get(client, user_id, 'job_xp');

            if(add) 
                xp += Number(job_xp);
            if(xp > client.s.MAX_XP) 
                xp = client.s.MAX_XP;
            if(xp < 0) 
                xp = 0;

            if(set_work_timer) client.data.cooldown.addUserToCooldown(client, msg.author.id, 'work');

            client.con.query(`UPDATE users SET job_xp = ${xp} WHERE id = '${user_id}'`);

            client.eventEm.emit('userLevelUP', msg.channel, user_id, xp, job_xp);
        }catch(e){
            client.msg.log("ERR", e, client.guild);
        }
    },

    addXP(client, msg, user_id, xp, set_work_timer=false){
        this.setXP(client, msg, user_id, xp, set_work_timer, true);
    },
}
