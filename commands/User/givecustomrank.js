module.exports = {
    name : "GiveCustomRank",
    alias : ["gcr"],
    use: "-GiveCustomRank [name] [hex-color]",
    description : "Creates a new rank with custom color for you",
    options: {ShowInHelp: true, Category: "User"},
    run : function(client, msg, args, discord){
        try{
            if(msg.member.roles.cache.array().length > client.s.MAX_RANKS ||
            !client.adminList.includes(msg.member.id) ||
            msg.guild.roles.cache.find(role => role.name.toLowerCase() == args[0].toLowerCase()))
                return

            [roleName, args] = client.utils.argsWithSpace(args);

            const roleColor = args[0];

            msg.guild.roles.create({
                data: {
                    name: roleName
                }})
                .then(role => {
                    role.setColor(roleColor).catch(console.error);
                    role.setPosition(3);
                    msg.member.roles.add(role);
                });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}
