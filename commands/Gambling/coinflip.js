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



            const embed = new discord.MessageEmbed()
                .setTitle('Heads or Tails?')

            msg.channel.send(embed)
                .then(newMessage => {

                    const filter = (reaction, user) => {

                        if (msg.author.id !== user.id)
                            return;

                        const index = client.s.EMOJIS.indexOf(reaction.emojis.name);

                        if (index == -1)
                            return;

                        if (index == 7) {
                            sendWinningMessage(client, msg, discord, bet, !isTails, 'head')
                        } else if (index == 19) {
                            sendWinningMessage(client, msg, discord, bet, isTails, 'tails')
                        }

                    }

                    newMessage.awaitReactions(filter, { time: 30000 })
                        .then(_ => {
                            if (newMessage.deleted)
                                newMessage.delete();
                        })

                })

        } catch (e) {
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}

function sendWinningMessage(client, msg, discord, bet, won, type) {

    const embed = new discord.MessageEmbed()

    if (won) {
        const winnings = Math.ceil((Math.random() * bet * 0.25))
        embed.setTitle('You choose correct!')
        embed.setDescription(`The money has been added to your account: $${client.utils.fixNumber(winnings, true)} for winning`)
    } else {
        embed.setTitle('')
    }

}