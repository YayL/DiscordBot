const cons = require(`./messaging.js`)

function getChannel(msg, channel){
    try{
        var regex = /\d+/g;
        if(channel == undefined){
            return msg.channel;
        }
        return msg.guild.channels.cache.get(channel.match(regex)[0]);
    }catch(e){
        cons.log("ERR", e, msg.guild);
    }

}

module.exports = {
    async clearChat(msg, amount, channel){
        channel = channel ? getChannel(msg, channel) : msg.channel;
        channel.bulkDelete(amount).catch(e => {return}); // Remove set amount of messages younger than 2 weeks old
    },

    async getMember(user_id, reference=null){
        try{
            if(!user_id) return;
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
            if(allowSnowFlakeErrors && 
                (e.stack.split('\n').slice(0, 1)[0] == 'DiscordAPIError: Invalid Form Body' || e.stack.split('\n').slice(0, 1)[0] == 'DiscordAPIError: Unknown User')){
                // reference can be null
                cons.log("ERR", e, reference.guild);
            }
            return null;
        }

    },

    // Returns a channel like the name says
    getChannel(msg, channel){
        return getChannel(msg, channel);
    },

    // This parses a string for a number follwed by a time suffix and returns the time in seconds for it
    // Ex: 20m -> 20 minutes -> 20*60 = 1200
    // Ex: 1h30m -> Error
    // Ex: 1.5h -> 1.5 hours -> 1.5*60*60 = 90*60 = 5400
    timeParser(str){
        timeSuffixList = ['m', 'h', 'd', 'w'];
        timeMultiplierList = [60, 3600, 86400, 604800];
        try{
            if(!str) 
                return false;

            if(isNaN(Number(str))){
                for(i in this.suffixList){
                    if(str.toLowerCase().endsWith(timeSuffixList[i].toLowerCase())) 
                        return Number(str.slice(0,-1))*timeMultiplierList[i];
                }
                if(isNaN(Number(str)) || (!override && Number(str) < 1)) 
                    return false;    
            }
            
            return Number(str);
        }catch(e){
            cons.log("ERR", e);
        }
    },

    // Takes a number as an input that is in seconds and makes it into a time string
    // Ex: 100000 -> 1d 3h 46m 40s
    timeFormat(totalSeconds){
        let str = '' 
        let days = Math.floor(totalSeconds/(60*60*24))

        if(days > 0) 
            str += `${days}days `

        totalSeconds %= 60*60*24
        let hours = Math.floor(totalSeconds / 3600)

        if(hours > 0) 
            str += `${hours}h `

        totalSeconds %= 3600;
        let min = Math.floor(totalSeconds / 60);

        if(min > 0) 
            str += `${min}min `

        let seconds = totalSeconds % 60;
        str += `${seconds}s`

        return str;
    },

    // This turns a number into a number with a suffix attached to it and two decimals
    // Ex: 125000000 -> 1.25B
    // Ex: 724320000000 -> 724.32T
    fixNumber(n='0', is_money=false){
        var isNeg = '';

        if(is_money && (-1e5 > n || n > 1e5)){
            if(n < 0){
                isNeg = '-';
                n = Number(n.toLocaleString('fullwide', {useGrouping:false}).slice(1));
            }
            const ind = Math.floor(Math.log10(n)) / 3 - 1;
            var number_string = n.toLocaleString('fullwide', {useGrouping:false}).slice(0, 3 + (Math.floor(Math.log10(n)) % 3));
            return isNeg + [number_string.slice(0, 1+Math.floor(Math.log10(n))%3), '.', number_string.slice(1+Math.floor(Math.log10(n))%3)].join('') + ' ' + this.suffixList[ind >= this.suffixList.length ? this.suffixList.length-1 : Math.floor(ind)];
        }
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // This takes a list of args and parses it if the first argument starts with a " and another that ends with a " and returns it as one argument
    // Ex: "hello is my name" 123 hour -> ["hello is my name", [123, hour]]
    argsWithSpace(args){
        try{
            let name = "";
            let endOfName = 0;
            if(args[0].startsWith('"')) {
                for(str of args){
                    name = name.concat(str, " ");
                    if (str.endsWith('"')){
                        endOfName = args.indexOf(str) + 1;
                        break;
                    }
                }
                name = name?.replace(/(['"])/g, "");
            }else 
                name=args[0];

            return [name.slice(0,name.length), args.slice(endOfName==0 ? 1 : endOfName)];
        }catch(e){
            cons.log("ERR", e)
        }

    },


    // This does the opposite of the fixNUmber function as it turns a string with a suffix into one without
    // 103.3k -> 103300
    suffixList: ['K', 'M', 'B', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'Oc'],
    suffixCheck(number, override=false){
        try{
            if(!number) 
                return false;
            if(!override && number.toLowerCase() == "all") 
                return "all";
            for(s of this.suffixList){
                if(number.toLowerCase().endsWith(s.toLowerCase())) 
                    return Number(number.slice(0,number.length - s.length))*(Math.pow(10, (this.suffixList.indexOf(s)+1)*3));
            }
            if(isNaN(Number(number)) || (!override && Number(number) < 1)) 
                return false;

            return Number(number);
        }catch(e){
            cons.log("ERR", e);
        }

    },

    // This uppercases the first letter in a string
    // Ex: *hello" -> "Hello"
    upFirstLetter(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    removeAnsi(str) {
        // Currently only removes SGR parameters (visual effects)
        const re = /\x1b\[[0-9;]*m/g;
        return str.replace(re, '');
    },
}
