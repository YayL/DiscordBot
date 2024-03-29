module.exports = {
    name: "Highlow",
    alias: ["hl"],
    use: "-Highlow [bet]",
    description: "Bet that you will choose correctly",
    options: {ShowInHelp: true, Category: "Gambling"},
    run: async function(client, msg, args, discord){
        try{
            let bet = client.utils.suffixCheck(args[0]);

            if(bet == "all") 
                bet = await client._user.bal.getBalance(client, msg.member.id);

            if(!bet || bet < 1) 
                return client.eventEm.emit('InvalidInputAmount', msg);

            if(!await client._user.bal.enoughMoney(client, msg, Number(bet))) 
                return;

            client._user.bal.addBalance(client, msg.member.id, -1*Number(bet));

            highlow(client, msg, discord, Number(bet))
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}

async function highlow(client, msg, discord, bet){
    const number = Math.floor(Math.random() * 100) + 1,
        hint = Math.floor(Math.random() * 100) + 1,
        embed = new discord.MessageEmbed();
    

    const filter = (reaction, user) => {
        if(user.id != msg.member.id) 
            return false;

        let correct = false;

        if(reaction.emoji.name == client.s.EMOJIS[7]){
            checkIfRight(client, msg, discord, bet, number, hint, "h");
            correct = true;
        }
        else if(reaction.emoji.name == client.s.EMOJIS[11] ){
            checkIfRight(client, msg, discord, bet, number, hint, "l");
            correct = true;
        }
        else if(reaction.emoji.name == client.s.EMOJIS[9] ){
            checkIfRight(client, msg, discord, bet, number, hint, "j");
            correct = true;
        }

        if(correct && !reaction.message.deleted) 
            reaction.message.reactions.removeAll()
                .then(message => {
                    message.delete();
                });
    }
    
    embed.setTitle(`${msg.member.displayName}'s high-low game`)
    embed.setDescription(`A number has been chosen at random. The hint is ${hint}\n`
            + `:regional_indicator_h: Higher\n`
            + `:regional_indicator_l: Lower\n`
            + `:regional_indicator_j: Jackpot`);

    embed.setFooter('Choose if you think it is higher, lower or that number');

    msg.channel.send(embed)
        .then(message => {
            message.awaitReactions(filter);
            message.react(client.s.EMOJIS[7]); //H
            message.react(client.s.EMOJIS[11]); //L
            message.react(client.s.EMOJIS[9]); //J
        })
}

function checkIfRight(client, msg, discord, bet, number, hint, choice){
    if(choice == "h" && number>hint){
        reply(client, msg, discord, bet, number, true);
    }
    else if(choice == "l" && number<hint){
        reply(client, msg, discord, bet, number, true);
    }
    else if(choice == "j" && number==hint){
        reply(client, msg, discord, bet, number, true, true);
    }
    else{
        reply(client, msg, discord, bet, number, false);
    }
}

function reply(client, msg, discord, bet, number, correct, jackpot=false){

    const winnings = Math.floor(bet*(Math.random()*(0.8-0.05)+0.05)),
        lose_message = `\nYou lost the money you bet!`,
        correct_message = `\nYou won $${client.utils.fixNumber(winnings, true)}!`,
        jackpot_message = `\nWell, this is rare! You won the jackpot of $${client.utils.fixNumber(winnings*100, true)}`,
        embed = new discord.MessageEmbed();
    let extra;

    if(correct && jackpot) {
        extra = jackpot_message;
        client._user.bal.addBalance(client, msg.member.id, bet + winnings*100);
    }
    else if(correct) {
        extra = correct_message;
        client._user.bal.addBalance(client, msg.member.id, bet + winnings);
    }
    else {
        extra = lose_message;
    }

    embed.setTitle(`You guessed ${correct ? "correctly" : "incorrectly"}!`)
    embed.setDescription(`The number was ${number} `+extra)
    embed.setColor("#2ce026")
    embed.setFooter('Go again!');

    msg.channel.send(embed);
}
