import os
import asyncio
import discord

from discord.ext import commands
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

load_dotenv()

DISCORD_TOKEN = os.environ['DISCORD_TOKEN']

PREFIX = '!'

intents = discord.Intents.default()
intents.members = True  # Enable member intents
intents.message_content = True

bot = commands.Bot(command_prefix=PREFIX, intents=intents)

# Comment out cogs you do not need during development
async def load_extensions():
    await bot.load_extension(f"cogs.MessageLogger")
    
async def on_message(self, message):
    print(f'Message from {message.author}: {message.content}')


async def main():
    async with bot:
        await load_extensions()
        await bot.start(DISCORD_TOKEN)

if __name__ == "__main__":
    asyncio.run(main())