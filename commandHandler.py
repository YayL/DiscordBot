import commands

prefix = "!"

cmds = commands.cmd

# [0] Name
# [1] AliasList
# [2] Description
# [3] Function Call


def checkIfAlias(cmdName):
	for cmd in cmds:
		for alias in cmds[cmd][1]:

			if alias.lower() == cmdName:
				return cmds[cmd][0].lower()
	return None


def handleCommand(msg):
	if msg.content.startswith(prefix):

		tempMessage = msg.content[1:]
		args = tempMessage.split()

		CommandName = args[0].lower()
		args.pop(0)

		alias = checkIfAlias(CommandName)
		if alias is not None:
			CommandName = alias

		cmds[CommandName][3](msg.author, args)
