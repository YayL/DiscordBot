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

	getMember: async (user_id, reference=null) => {
		try{
			if(user_id == undefined) return
			if(user_id.startsWith('<@') && user_id.endsWith('>')) {
				user_id = user_id.slice(2, -1);
				if (user_id.startsWith('!')) {
					user_id = user_id.slice(1);
				}
			}
			return await reference.guild.members.fetch(user_id)
			.then(member => {
				if(member.bot) return null;
				return member;
			});
    	}catch(e){
    		const allowSnowFlakeErrors = false;
    		if(allowSnowFlakeErrors && (e.stack.split('\n').slice(0, 1)[0] == 'DiscordAPIError: Invalid Form Body' || e.stack.split('\n').slice(0, 1)[0] == 'DiscordAPIError: Unknown User')){
    			cons.log(reference.guild, e)
    		}
    		return null
    	}

	},

	getChannel(msg, channel){
		return getChannel(msg, channel);
	},

	timeParser(str){
		timeSuffixList = ['m', 'h', 'd', 'w'];
		timeMultiplierList = [60, 3600, 86400, 604800]
		try{
			if(!str) return false;
			for(i in this.suffixList){
				if(str.toLowerCase().endsWith(timeSuffixList[i].toLowerCase())) return Number(str.slice(0,-1))*timeMultiplierList[i];
			}
			if(isNaN(Number(str)) || (!override && Number(str)<1)) return false;

			return Number(number);
    	}catch(e){
    		console.log(e)
    	}
	},

	fixNumber(n, is_money=false){
		var isNeg = ''
		if(is_money && (-1e5 > n || n > 1e5)){
			if(n < 0){
				isNeg = '-'
				n = Number(n.toLocaleString('fullwide', {useGrouping:false}).slice(1))
			}
			const ind = Math.floor(Math.log10(n))/3 -1
			var number_string = n.toLocaleString('fullwide', {useGrouping:false}).slice(0, 3+(Math.floor(Math.log10(n))%3))
			return isNeg + [number_string.slice(0, 1+Math.floor(Math.log10(n))%3), '.', number_string.slice(1+Math.floor(Math.log10(n))%3)].join('') + this.suffixList[ind >= this.suffixList.length ? this.suffixList.length-1 : Math.floor(ind)]
		}
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	},

	argsWithSpace(args){
		try{
			let name = "";
			let endOfName = 0;
			if(args[0].startsWith('"')) {
				for(str of args){
					name = name.concat(str, " ")
					if (str.endsWith('"')){
						endOfName = args.indexOf(str)+1;
						break
					}
				}
				name = name?.replace(/(['"])/g, "");
			}else name=args[0]

			return [name.slice(0,name.length), args.slice(endOfName==0 ? 1 : endOfName)];
    	}catch(e){
    		console.log(e)
    	}

	},

	suffixList: ['K', 'M', 'B', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'Oc'],

	suffixCheck(number, override=false){
		try{
			if(!number) return false;
			if(!override && number.toLowerCase() == "all") return "all"
			for(s of this.suffixList){
				if(number.toLowerCase().endsWith(s.toLowerCase())) return Number(number.slice(0,number.length - s.length))*(Math.pow(10, (this.suffixList.indexOf(s)+1)*3))
			}
			if(isNaN(Number(number)) || (!override && Number(number)<1)) return false;

			return Number(number);
    	}catch(e){
    		console.log(e)
    	}

	},

	upFirstLetter(str){
		return str.charAt(0).toUpperCase() + str.slice(1)
	}
}
