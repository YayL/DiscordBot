module.exports = {
    name: "LogUserCache",
    alias: ['loguc'],
    use: "-LogUserCache",
    description: "Print out the user cache",
    options: {ShowInHelp: false, Category: 'Utils'},
    run: async function(client, msg, args, discord){
        try{
            console.log(client.userCache);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}