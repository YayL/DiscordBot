cmd = {}

# [0] Name
# [1] AliasList
# [2] Description
# [3] Function Call



# -- Help --

def help(sender, args):
	print("Hello")


cmd["help"] = [
	"Help", # Name
	("info", "commands", "cmds"), # Alias list
	"This command displays the command list", # Description
	help # Function Call
]

# -- Vote Kick --


def voteKick(sender, args):
	pass


cmd["votekick"] = [
	"VoteKick", # Name
	("kick", "vk"), # Alias List
	"This command creates a vote to kick a user", # Description
	voteKick # Function Call
]

# -- Vote Mute --

def voteMute(sender, args):
	pass


cmd["votemute"] = [
	"VoteMute", # Name
	("mute", "vm"), # Alias list
	"This command creates a vote to mute a user", # Description
	voteMute # Function Call
]

# -- Vote --


