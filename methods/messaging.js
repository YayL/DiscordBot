const s = require('../info/settings.js');

module.exports = {
	createVote(title, description, fieldTitle, fieldText, msg, discord){
		try{
			var embed = new discord.MessageEmbed()
				.setTitle(title)
				.setDescription(description)
				.setColor('#74ed4c')
				.setFooter(`Vote below if you agree or disagree!\n - ${msg.member.displayName}`)
				.addFields({
					name: fieldTitle,
					value: fieldText
				});

			const channel = msg.guild.channels.cache.get(msg.client.channelId.voting);

			return channel.send(embed)
				.then(em => {
					em.react("✅");
					em.react("❌");
					return em;
				});
    	}catch(e){
    		this.log(msg.guild, e);
    	}
	},

	errorReply(msg, text, discord, footer){
		try{
			if(footer == undefined){
				footer = "Make sure to input correct arguments!";
			}

			var embed = new discord.MessageEmbed()
				.setTitle("**A problem occured**")
				.addFields({
					name: "Error:",
					value: text
				})
				.setColor('#b80909')
				.setFooter(footer);

			msg.channel.send(embed).catch(console.error);
    	}catch(e){
    		this.log(msg.guild, e);
    	}
	},

	reply(msg, title, text, discord){
		try{
			var embed = new discord.MessageEmbed()
				.setTitle(`**${title}**`)
				.setDescription(text)
				.setColor('#0ac2c2')
				.setFooter("Have a good day!");

			msg.channel.send(embed).catch(console.error);
    	}catch(e){
    		this.log(msg.guild, e);
    	}
	},

	log(guild, toLog, slicing=3){
		if(s.LOG_ERRORS_TO_DISCORD){
			try{
				var stack = toLog.stack.split("\n").slice(1);
				
				guild.channels.cache.get('842354024573566986').send({
				    embed: {
				      author: {name: `❌ ${toLog} ❌`},
				      color: "FFFFFF",
				      description: `${stack}`,
				      footer: { text: `Time to fix some bugs! Good luck!`},
				    }
			  	}).catch(console.error);
	    	}catch(e){
	    		console.log(e);
	    	}
	    }else {
	    	console.log(toLog);
	    }
		
	}
}