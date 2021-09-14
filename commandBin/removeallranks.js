module.exports = {
    name : "RemoveAllRanks",
    alias : ["rar"],
    description : "Remove all ranks except member",
    run : function(msg, client, cmds, disc, args){
        const roles = msg.guild.roles.cache.map(role => role);
        for(role of roles){
            if(role.name === "TEMP" || role.name == "ADMIN"){
                role.delete();
            }
        }
    }
}