module.exports = (client, disc, msg, CommandName, args) => {
    client.msg.errorReply(msg,"*The command:* **__" + CommandName + " " + args.join(" ") + "__**" + " *was not found or the arguments were incorrect!*",
		 disc, "Check your command again, otherwise report this to @!YayL as soon as possible!");
}