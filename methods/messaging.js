const fs = require("fs");
const utils = require("./utils.js");
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

	_logStream: null,
	_logLevels: {
	  "TRACE": {level: 0, name: "TRACE", color: "#7fff7f", ansiColor: "38;5;10"},
	  "DEBUG": {level: 1, name: "DEBUG", color: "#888888", ansiColor: "38;5;7"},
	  "INFO":  {level: 2, name: "INFO",  color: "#ffffff", ansiColor: ""}, // Empty ANSI code is treated as reset
	  "WARN":  {level: 3, name: "WARN",  color: "#ffff77", ansiColor: "38;5;11"},
	  "ERR":   {level: 4, name: "ERR",   color: "#ff0000", ansiColor: "38;5;9"},
	  "FATAL": {level: 5, name: "FATAL", color: "#770000", ansiColor: "38;5;1"},
	},

	_initLog() {
	  if(s.LOG_TO_FILE) {
		let logFile = "./bot.log";
		this._logStream = fs.createWriteStream(logFile, {flags: 'w'});
		this.log("INFO", `Logging to file: ${logFile}`)
	  }
	},

	// Simsva's contribution
	log(level, msg, guild=null){
	  let logLevel = this._logLevels[level.toUpperCase()];
	  if(!logLevel) {
		// NEVER remove logLevel.ERR
		this.log("ERR", "Invalid log level!", guild);
		return 1;
	  } else if(logLevel.level < s.LOGGING_LEVEL) return 0;
  
	  let time = new Date();
	  let timestamp = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
	  let format = `\x1b[${logLevel.ansiColor}m[${level.toUpperCase()} ${timestamp}] ${msg}\x1b[m`;
  
	  // Log to console and file
	  console.log(format);
	  if(s.LOG_TO_FILE)
		// Logging to file with ANSI color, read with pager
		if(!this._logStream.write((s.LOG_TO_FILE_ANSI ? format : utils.removeAnsi(format)) + '\n'))
		  // Flush stream if buffering
		  this._logStream.once("drain");
  
	  if(s.LOG_TO_DISCORD && guild){
		try{
		  guild.channels.cache.get(require('../botConfig.json').channelId.errors).send({
			embed: {
			  author: {name: `${logLevel.name}`},
			  color: logLevel.color,
			  description: `${msg}`,
			  footer: { text: "Logging to discord enabled" },
			},
		  });
		}catch(e){
		  this.log("ERR", e, guild);
		}
	  }
	  return 0;
	},
}