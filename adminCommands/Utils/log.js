module.exports = {
  name: "Log",
  alias: [],
  use: "-Log [Level] [Message]",
  description: "Logs a message",
  options: {ShowInHelp: false, Category: 'Utils'},
  run: async (client, msg, args, discord) =>{
    try{
      let text = args.slice(1).join(" ");

      if(args[0].toLowerCase() == "all"){
        client.msg.log("TRACE", text, msg.guild);
        client.msg.log("DEBUG", text, msg.guild);
        client.msg.log("INFO", text, msg.guild);
        client.msg.log("WARN", text, msg.guild);
        client.msg.log("ERR", text, msg.guild);
        client.msg.log("FATAL", text, msg.guild);
      }else
        client.msg.log(args[0], text, msg.guild);
    }catch(e){
      client.eventEm.emit("CommandError", msg, this.name, args, e);
    }
  }
};
