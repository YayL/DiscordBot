xpTop = 30
xpBottom = 5

timeBetweenWork = 30

module.exports = {
	name : "Work",
	alias : ["w"],
	use: "-Work",
	description : "Earn some cash from the job you have",
	options: {ShowInHelp: true, Category: "Economy"},
	run : function(msg, client, disc, args){
		client.con.query(`SELECT * FROM user WHERE id = ${msg.author.id}`, (e, rows) => {
			if(e) return client.eventEm.emit('CommandError', msg, "Work", args, e)

			if(rows[0].job_name == "Unemployed") return client.eventEm.emit('notEmployed', msg)

			let timeLeft = timeBetweenWork*60 - ((Date.now() - rows[0].last_work)/1e3)

			if(timeLeft>0) return client.eventEm.emit('WorkTimeout', msg, timeLeft)

			xp_grant = Math.floor(Math.random() * (xpTop - xpBottom + 1) + xpBottom)
			base_pay = client.jobList.get(rows[0].job_name).base_pay
			money_grant = Math.floor(base_pay * ((1.15*(Math.random()+Math.random())/4.5) + 1))
			client.m.data.user.addXP(client, msg.member, xp_grant, true)
			client.m.data.bal.updateUserBalance(client, msg.author, money_grant, "add")
			client.m.msg.reply(msg, "Great work!", `You earned **${xp_grant}xp**\nand `
				+ `**$${client.m.utils.numberWithCommas(base_pay)}** + a bonus of `
				+ `**$${client.m.utils.numberWithCommas(money_grant-base_pay)}**`, disc)
		})
	}
}

