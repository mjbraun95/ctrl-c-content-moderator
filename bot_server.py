import discord

# Define intents
intents = discord.Intents.default()
intents.messages = True  # If you want to receive messages

# Create a client instance with the defined intents
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

with open("bot_token.txt", 'r') as f:
    token = f.read().replace('\n', '')

client.run(token)