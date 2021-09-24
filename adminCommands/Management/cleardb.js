module.exports = {
    name: "ClearDB",
    alias: ["cdb"],
    use: "-ClearDB",
    description: "Manually activate the cleaning of the database for duplicate entries",
    options: {ShowInHelp: false, Category: 'Management'},
    run: async function(client, msg, args, discord){
        try{
            client.data.cleanDatabase(client);
            client.eventEm.emit('processFinished', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }

    }
}
