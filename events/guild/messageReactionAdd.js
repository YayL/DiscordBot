const updaterules = require('./../../loaders/updateRules.js');

let calculatePositivesNeeded = (negatives, members) => (5 * members * (negatives - 1) + 5 * ((negatives - 1) ** 2) + members ** 2) / (5 * members);

module.exports = (client, discord, reaction) => {

    if (reaction.message.channel.id == client.channelId.voting) {

        const negative = reaction.message.reactions.cache.get('❌');

        if(negative == undefined)
            return;

        if (negative.count + Math.ceil(calculatePositivesNeeded(negative.count, reaction.message.guild.memberCount - client.botCount)) > reaction.message.guild.memberCount - client.botCount && !reaction.message.deleted) {
            reaction.message.delete();
        }

        if (reaction.emoji.name == '✅' && reaction.count - 1 >= Math.ceil(calculatePositivesNeeded(negative.count, reaction.message.guild.memberCount - client.botCount))) {
            const command = client.votes.get(reaction.message);

            if (command == undefined)
                return;

            command[0].run(client, command[1]);
            if(!reaction.message.deleted)
                reaction.message.delete();
            updaterules.update(client, discord, reaction.message);
        }
    }
}