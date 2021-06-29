module.exports = (client, disc, msg, CommandName, args, e, cmdh=false) => {
    
    if(e instanceof TypeError && e.message == 'Cannot read property \'run\' of undefined'){ // Check if the error yielded was a type error(Commonly means that it was unable to find CommandName in command collection)
        client.eventEm.emit('InvalidCommand', msg, CommandName, args)
    }else{
        client.msg.errorReply(msg,"*There was an issue with command:* **" + CommandName + " " + args.join(" ") + "**",
         disc, "Report this to @!YayL as soon as possible!");
    }
    if(!cmdh) client.msg.log(client.guild, e, 4)
}