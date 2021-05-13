const cons = require(`./messaging.js`)

function getChannel(msg, channel){
	try{
		var regex = /\d+/g
		if(channel == undefined){
			return msg.channel
		}
		return msg.guild.channels.cache.get(channel.match(regex)[0]);
	}catch(e){
		cons.log(msg, e)
	}
	
}

module.exports = {
	clearChat: async (msg, amount, channel) => {
		channel = channel != undefined ? getChannel(msg, channel) : msg.channel;
		channel.bulkDelete(amount).catch(e => {return}); // Remove set amount of messages younger than 2 weeks old

	},

	getMember: async (player, reference) => {
		try{
			if(player == undefined) return
			if(player.startsWith('<@') && player.endsWith('>')) {
				player = player.slice(2, -1);
				if (player.startsWith('!')) {
					player = player.slice(1);
				}
			}
			return await reference.guild.members.fetch(player)
			.then(member => {
				if(member.bot) return null;
				return member;
			});
    	}catch(e){
    		cons.log(reference.guild, e)
    	}
		
	},

	getChannel(msg, channel){
		return getChannel(msg, channel);
	},

	numberWithCommas(n){
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	argsWithSpace(args){
		try{
			let name = "";
			let endOfName = 0;
			if(args[0].startsWith('"')) {
				for(str of args){
					name = name.concat(str, " ")
					if (str.endsWith('"')){
						endOfName = args.indexOf(str) +1;
						break
					}
				}
				name = name.replace(/(['"])/g, "");
			}else name=args[0]

			return [name.slice(0,name.length-1), args.slice(endOfName==0 ? 1 : endOfName)];
    	}catch(e){
    		console.log(e)
    	}
		
	},

	suffixList: ['k', 'm', 'b', 't'],

	suffixCheck(number, override=false){
		try{
			if(!number) return false;
			if(!override && number.toLowerCase() == "all") return "all"
			for(s of this.suffixList){
				if(number.toLowerCase().endsWith(s)) return Number(number.slice(0,number.length - s.length))*(Math.pow(10, (this.suffixList.indexOf(s)+1)*3))
			}
			if(isNaN(Number(number)) || (!override && Number(number)<1)) return false;
			return Number(number);
    	}catch(e){
    		console.log(e)
    	}
		
	}
}