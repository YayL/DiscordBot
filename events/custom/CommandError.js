module.exports = (client, disc, msg, CommandName, args, e) => {
    
    if(e instanceof TypeError && e.message == 'Cannot read property \'run\' of undefined'){ // Check if the error yielded was a type error(Commonly means that it was unable to find CommandName in command collection)
        client.eventEm.emit('InvalidCommand', msg, CommandName, args)
    }else{
        console.log(e.stack);
        client.m.msg.errorReply(msg,"*There was an issue with command:* **" + CommandName + " " + args.join(" ") + "**",
         disc, "Report this to @!YayL as soon as possible!");
    }
}