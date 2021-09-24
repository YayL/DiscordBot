module.exports = {
    name: "Roulette",
    alias: ["r"],
    use: "-Roulette [bet]",
    description: "Play a game of roulette",
    options: { ShowInHelp: true, Category: "Gambling" },
    run: async function(client, msg, args, discord) {
        try {

            const bet = client.utils.suffixCheck(args[0])

        } catch (e) {
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}