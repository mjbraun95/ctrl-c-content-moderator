from discord.ext import commands
import openai
from openai import OpenAI
import os

OPENAI_TOKEN = os.environ['openai']

class MessageLogger(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief='Says hi', aliases=['hi'])
    async def hello(self, ctx):
        await ctx.send(content='hi')
        
    @commands.Cog.listener()
    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')
    
        message1 = Check("I want to kill them.")
        message1.give_info()

async def setup(bot):
  await bot.add_cog(MessageLogger(bot))

#Checks a username's comment
class Check:
    def __init__(self, message, username = None, flagged = None):

        #Calls openai moderator and gathers offensiveness response given the message.
        client = OpenAI(api_key=OPENAI_TOKEN)
        self.response = client.moderations.create(input=message)

    def give_info(self):

        #Makes the data usable.
        response_dict = self.response.model_dump()
    
        #If the object is safe, then it doesn't need to be scanned.
        flagged = response_dict["results"][0]["flagged"]

        if flagged == False:
            return {"flagged": flagged}
        
        #Find categories with scores.
        else:
            categories = response_dict["results"][0]["categories"]
            category_scores = response_dict["results"][0]["category_scores"]

            #Top three - Go through scores as a list and sort them in reverse order.
            category_scores_list = []
            for key in category_scores:
                category_scores_list.append([category_scores[key],key])

            category_scores_list.sort()
            category_scores_list.reverse()

            #Top three get extracted.
            top_three_list = category_scores_list[0:3]

            #Top three is converted back to a dict.
            top_three_dict = {}
            for index, element in enumerate(top_three_list):
                key = element[1]
                value = element[0]
                top_three_dict[key] = value
            
            print(top_three_dict)


            return (categories, category_scores)
        
