module.exports = {

	isOnCooldown(client, user_id, timer_name){
		if(client.userCooldowns[timer_name].has(user_id)){
			return Date.now() < client.userCooldowns[timer_name].get(user_id) + client.userTimersCooldown[timer_name];
		}

		return false;
	},

	getTimeLeft(client, user_id, timer_name){
		return ((client.userCooldowns[timer_name].get(user_id) + client.userTimersCooldown[timer_name]) - Date.now()) / 1000;

	},

	addUserToCooldown(client, user_id, timer_name){
		client.userCooldowns[timer_name].set(user_id, Date.now());

		setTimeout(() => {
			client.userCooldowns[timer_name].delete(user_id);
		}, client.userTimersCooldown[timer_name]);
	}

}