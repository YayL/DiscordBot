const updaterules = require('./../../loaders/updateRules.js');

let calculatePositivesNeeded = (negatives, members) => (5 * members * (negatives - 1) + 5 * ((n - 1) ** 2) + members ** 2) / (5 * members);

module.exports = (client, discord, reaction) => {

    if (reaction.message.channel.id == client.channelId.voting) {

        const negativeCount = reaction.message.reactions.cache.get('❌').count;

        if (negativeCount + Math.ceil(calculatePositivesNeeded(negativeCount, reaction.message.guild.memberCount - client.botCount)) > reaction.message.guild.memberCount - client.botCount) {
            reaction.message.delete();
        }

        if (reaction.emoji.name == '✅' && reaction.count - 1 >= Math.ceil(calculatePositivesNeeded(negativeCount, reaction.message.guild.memberCount - client.botCount))) {
            const command = client.votes.get(reaction.message);

            if (command == undefined)
                return;

            command[0].run(client, command[1]);
            reaction.message.delete();
            updaterules.update(client, discord, reaction.message);
        }
    }
}