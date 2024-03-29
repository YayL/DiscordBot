const vote = {
    run: function(client, index){
        client.data.rules.updateRules(client, "", "", "del", index);
    }
}

module.exports = {
    name : "RemoveLaw",
    alias : ["rlaw"],
    use: "-RemoveLaw [Number] [Reason]",
    description : "Create a vote to remove a new law/rule from the server",
    options: {ShowInHelp: true, Category: "Voting"},
    run : async function(client, msg, args, discord){
        try{
            let index = Number(args[0]);

            if(isNaN(index)){
                return client.msg.errorReply(msg, "Make sure to input an actual law id");
            }

            let law = await client.data.rules.getRule(client, index)
                .then(law => {
                    return law;
                });    

            if(law.corelaw == 1) 
                return client.msg.reply(msg,"*It is not possible to remove the corelaw:* __" + law.rule_name +"__",
                    "If you still have questions about this decision take it up with an Engineer!", discord);
            
            const title = "Propositon Remove Law: ***Law #" + index + " - " + law.rule_name +"***",
                 desc = `Do you agree with ${msg.member.user.username} that we need to remove this law?`,
                fieldTitle = "Why should we remove this law?",
                fieldText = args.slice(1).join(" ");
            
            client.msg.createVote(title, desc, fieldTitle, fieldText, msg, discord)
                .then(em => {
                    client.votes.set(em, [vote, index]);
                });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

