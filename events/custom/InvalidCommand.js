module.exports = (client, disc, msg, CommandName, args) => {
    client.m.msg.errorReply(msg,"*The command:* **__" + CommandName + " " + args.join(" ") + "__**" + " *was not found*",
		client, disc, "Check your command again, otherwise report this to @!YayL as soon as possible!");
}