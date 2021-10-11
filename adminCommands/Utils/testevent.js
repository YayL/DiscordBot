const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = {
    name: "TestEvent",
    alias: ["te", "tevent"],
    use: "-TestEvent",
    description: "Test event",
    options: {ShowInHelp: false, Category: 'Utils'},
    run: async function(client, msg, args, discord){
        try{   

            client.con.query(`SELECT * FROM market WHERE deadline < ${Math.floor(Date.now()/1000)}`, (e, result) => {
                if(result.rowCount == 0)
                    return;
                    
                for(let row of result.rows){
                    client.data.market.remove(client, row);
                }
            });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}
