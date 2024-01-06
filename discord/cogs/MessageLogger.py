from discord.ext import commands


class MessageLogger(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief='Says hi', aliases=['hi'])
    async def hello(self, ctx):
        await ctx.send(content='hi')
        
    @commands.Cog.listener()
    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')

async def setup(bot):
  await bot.add_cog(MessageLogger(bot))