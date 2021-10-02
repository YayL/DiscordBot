const { Message } = require("discord.js")

module.exports = {
    name: "Coinflip",
    alias: ["cf"],
    use: "-Coinflip [bet]",
    description: "Flip a coin for some money",
    options: { ShowInHelp: true, Category: "Gambling" },
    run: async function(client, msg, args, discord) {
        try {

            const bet = client.utils.suffixCheck(args[0])
            const isTails = (~~((Math.random() * 100) + 1)) % 2 == 0

            if(bet == false || bet < 1)
                return client.eventEm.emit('InvalidInputAmount', msg)

            if(! await client._user.bal.enoughMoney(client, msg, bet))
                return;

            if(bet == 'all')
                bal = Number((await client._user.get()).bank);

            const embed = new discord.MessageEmbed()
                .setTitle('Heads or Tails?')

            msg.channel.send(embed)
                .then(newMessage => {

                    const filter = (reaction, user) => {

                        if (msg.author.id !== user.id)
                            return;

                        const index = client.s.EMOJIS.indexOf(reaction.emoji.name);

                        if (index == -1)
                            return;

                        if (index == 7) {
                            handleWinnings(client, msg, discord, bet, !isTails, 'Head')
                        } else if (index == 19) {
                            handleWinnings(client, msg, discord, bet, isTails, 'Tails')
                        }

                    }

                    newMessage.awaitReactions(filter, { time: 30000 })
                        .then(_ => {
                            if (newMessage.deleted)
                                newMessage.delete();
                        })
                    
                    newMessage.react(client.s.EMOJIS[7]);
                    newMessage.react(client.s.EMOJIS[19]);

                })

        } catch (e) {
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}

function handleWinnings(client, msg, discord, bet, won, type) {

    const embed = new discord.MessageEmbed()

    if (won) {
        const winnings = Math.ceil((Math.random() * bet * 0.25))
        embed.setTitle(`${type} is correct!`)
        embed.setDescription(`You recieve 💵 $${client.utils.fixNumber(winnings, true)} for winning`)
        client._user.set(client, msg.author.id, 'bank', winnings)
    } else {
        embed.setTitle(`${type} is unfortunately not correct!`)
        embed.setDescription(`You lost 💵 $${client.utils.fixNumber(bet, true)}`)
    }

    msg.channel.send(embed);

}