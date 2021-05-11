function getChannel(msg, channel){
	var regex = /\d+/g
	if(channel == undefined){
		return msg.channel
	}
	return msg.guild.channels.cache.get(channel.match(regex)[0]);
}

module.exports = {
	clearChat: async (msg, amount, channel) => {
		channel = channel != undefined ? getChannel(msg, channel) : msg.channel;
		try{
			if(typeof(amount) === 'number'){
				channel.bulkDelete(amount).catch(console.error); // Remove set amount of messages younger than 2 weeks old
			}
		}catch(e){
			console.log(e);
		}
	},

	getMember: async (player, reference) => {
		if(player == undefined){return}
		if(player.startsWith('<@') && player.endsWith('>')) {
			player = player.slice(2, -1);
			if (player.startsWith('!')) {
				player = player.slice(1);
			}
		}
		return reference.guild.members.fetch(player)
		.then(member => {
			if(member.bot) return null;
			return member;
		});
	},

	getChannel(msg, channel){
		return getChannel(msg, channel);
	},

	numberWithCommas(n){
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	argsWithSpace(args){
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
		}else{name=args[0]}

		return [name, args.slice(endOfName)];
	},

	suffixList: ['k', 'm', 'b', 't'],

	suffixCheck(number, override=false){
		if(!number) return false;
		if(!override && number.toLowerCase()=="all") return "all"
		for(s of this.suffixList){
			if(number.endsWith(s)) return Number(number.slice(0,number.length - s.length))*(Math.pow(10, (this.suffixList.indexOf(s)+1)*3))
		}
		if(isNaN(Number(number)) || (!override && Number(number)<1)) return false;
		return Number(number);
	}
}