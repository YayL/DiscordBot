module.exports = {
    name : "Admin",
    alias : ["a"],
    use: "-Admin",
    description : "Give author admin role",
    options: {ShowInHelp: false, Category: 'Management'},
    run : function(client, msg, args, discord){
        try{
            msg.guild.roles.fetch(client.roleId.admin) // Get admin rank using its role id
                .then(role => {
                    msg.member.roles.add(role);
                });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }

}