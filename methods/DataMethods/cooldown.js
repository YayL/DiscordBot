module.exports = {

    isOnCooldown(client, user_id, timer_name){
        if(client.userCooldowns[timer_name][0].has(user_id)){
            return Date.now() < client.userCooldowns[timer_name][0].get(user_id) + client.userCooldowns[timer_name][1];
        }

        return false;
    },

    getTimeLeft(client, user_id, timer_name){
        return ((client.userCooldowns[timer_name][0].get(user_id) + client.userCooldowns[timer_name][1]) - Date.now()) / 1000;

    },

    addUserToCooldown(client, user_id, timer_name){
        client.userCooldowns[timer_name][0].set(user_id, Date.now());

        setTimeout(() => {
            client.userCooldowns[timer_name][0].delete(user_id);
        }, client.userCooldowns[timer_name][1]);
    }

}