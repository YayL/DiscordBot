module.exports = (client, discord, msg, CommandName, args, e, cmdh=false) => {
    
    if(e instanceof TypeError && e.message == 'Cannot read property \'run\' of undefined'){ // Check if the error yielded was a type error(Commonly means that it was unable to find CommandName in command collection)
        client.eventEm.emit('InvalidCommand', msg, CommandName, args);
    }
    else{
        const embed = new discord.MessageEmbed()
            .setTitle(`There was an issue with the command: __${CommandName} ${args.join(' ')}__`)
            .setColor('b80909');

        msg.channel.send(embed);
        client.msg.log(client.guild, e);
    }
}