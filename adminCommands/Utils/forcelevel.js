module.exports = {
    name: "ForceLevel",
    alias: [],
    use: "-ForceLevel @[user]",
    description: "Get a users level",
    options: {ShowInHelp: false, Category: 'Utils'},
    run: async function(client, msg, args, discord){
        try{
            let level = 0;

            if(args[0] == "me")
            {
                level = await client.data.jobs.expToLevel((await client._user.get(client, msg.author.id)).experience, true);
                return client.msg.reply(msg, `${msg.member.displayName}'s Level:`, `Level: **${level}**`, discord);
            }
            else
            {
                client.utils.getMember(args[0], msg)
                    .then(async (member) => {
                        if(member == null) 
                            return;

                        level = await client.data.jobs.expToLevel((await client._user.get(client, member.id)).experience, true);
                        return client.msg.reply(msg, `${member.displayName}'s Level:`, `Level: **${level}**`, discord);
                    });
            }
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}