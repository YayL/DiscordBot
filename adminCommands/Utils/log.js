module.exports = {
  name: "Log",
  alias: [],
  use: "-Log [Level] [Message]",
  description: "Logs a message",
  options: {ShowInHelp: false, Category: 'Utils'},
  run: async (msg, client, disc, args) =>{
    try{
      client.msg.log(args[0], args.slice(1).join(" "), msg.guild);
    }catch(e){
      client.eventEm.emit("CommandError", msg, this.name, args, e);
    }
  }
};
