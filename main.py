import discord
import commandHandler

file = open('token.txt', "r")
token = file.read()
file.close()

client = discord.Client()


@client.event
async def on_ready():
	print("Yes Hello")


@client.event
async def on_message(msg):
	if msg.author == client.user:
		return

	commandHandler.handleCommand(msg)

if __name__ == "__main__":
	client.run(token)
