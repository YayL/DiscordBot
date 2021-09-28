const commandHandler = require("../../commandHandler");

const test_cases = [
    '-help',
    '-help Economy',
    '-addbalance me 1000',
    '-sbal me 1000',
    '-sper me 1',
    '-ulb',
    '-ugi',
    '-give me 1 10',
    '-clear 1',
    '-ur',
    '-award me 1',
    '-xp me 100',
    '-slvl me 15',
    '-sreb me 2',
    '-forcelevel me',
    '-bal',
    '-jobs',
    '-lb',
    '-lb l',
    '-lb r',
    '-lb g',
    '-mv 1',
    '-mymarket',
    '-ma 1 10 100m 1m',
    '-mv %',
    '-pay % 100',
    '-w',
    '-steal %',
    '-gdisband',
    '-gleave',
    '-gcreate test',
    '-ginvite %',
    '-gmembers',
    '-gvault',
    '-g',
    '-gdisband',
    '-info 1',
    '-inv',
    '-inv 100',
    '-inv m',
    '-loot',
    '-loot common',
    '-sbal me 100k',
    '-loot common 1',
    '-sell common',
    '-sell uncommon',
    '-sell all',
    '-m',
    '-p',
    '-sbal me 100m',
    '-tr',
    '-tr 100b',
    '-tr all',
    '-addlaw test hello and welcome',
    '-deletelaw 3 cause it is no more',
    '-votekick %',
    '-votemute %',
    '-reset me',
    '-sbal me -100m',
    '-loot common 1',
    '-loot legendary 1',
    '-pay % 1000m',
    '-pay % all',
    '-reset me',
    '-exe % -p'
]

module.exports = {
    name: "TestAllCommands",
    alias: ['tac'],
    use: "-TestAllCommands @[user1] @[user2] [auto(true/false)] [startIndex]",
    description: "A command to test all commands for errors",
    options: {ShowInHelp: false, Category: 'Utils'},
    run: async (client, msg, args, discord) =>{
        try{
            
            if(msg.mentions.users.array().length != 2)
				return client.eventEm.emit('InvalidArgs', msg, this.use);

            const auto = args.length >= 2 
                ? args[2] == 'true'
                : false;

            const startIndex = args.length >= 3 
                ? ! Number.isNaN(Number(args[3])) 
                    ? Number(args[3])
                    : 0
                : 0

            for(let i = startIndex; i < test_cases.length; i++){
                
                command = test_cases[i].split(' ')
                for(let i = 0; i < command.length; i++){
                    if(command[i] === '%')
                        command[i] = args[0];
                    else if(command[i] === '%%')
                        command[i] = args[1];
                }
                
                msg.content = command.join(' ');

                console.log(`${i}: ${command.join(' ')}`);

                commandHandler.handleCommand(msg, client, discord);

                if(auto){
                    await client.sleep(750)
                }
                else{
                    if(! await sendConfirmationMessage(client, msg, discord))
                        break;
                }
            }

            client.eventEm.emit('processFinished', msg);

        }catch(e){
            client.eventEm.emit("CommandError", msg, this.name, args, e);
        }
    }
};


async function sendConfirmationMessage(client, msg, discord){

    return new Promise(resolve => {
        
        const embed = new discord.MessageEmbed()
            .setTitle('Do you want to continue?');

        msg.channel.send(embed)
            .then(newMessage => {
                
                const filter = (reaction, user) => {

                    if(user.id !== msg.author.id)
                        return false;

                    resolve(Object.values(client.s.YES_NO_EMOJIS).indexOf(reaction.emoji.name))
                }

                newMessage.awaitReactions(filter, {time: 20000})
                    .then(_ => {
                        if(!newMessage.deleted)
                            newMessage.delete()
                    });

                newMessage.react(client.s.YES_NO_EMOJIS[1]);
                newMessage.react(client.s.YES_NO_EMOJIS[0]);
            });

    })

    
}