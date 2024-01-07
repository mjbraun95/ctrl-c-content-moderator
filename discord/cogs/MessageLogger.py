import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from discord.ext import commands
import openai
from openai import OpenAI
import os
import requests
import json

OPENAI_TOKEN = os.environ['openai']

# Use the service account
cred = credentials.Certificate('firebase\ctrl-c-hacked2024-firebase-adminsdk-uevsn-c64338b9d8.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

class MessageLogger(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief='Says hi', aliases=['hi'])
    async def hello(self, ctx):
        await ctx.send(content='hi')
        
    @commands.Cog.listener()
    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')
    
        message1 = Check(message.content)
        hate_info = message1.hating_info()  # (categories, category_scores, top_three_dict)

async def setup(bot):
    await bot.add_cog(MessageLogger(bot))

#Checks a username's comment
class Check:
    def __init__(self, message, username = None, flagged = None):

        self.username = username
        self.message = message
        #Calls openai moderator and gathers offensiveness response given the message.
        self.client = OpenAI(api_key=OPENAI_TOKEN)
        self.response = self.client.moderations.create(input=message)

    def hating_info(self):

        #Makes the data usable.
        response_dict = self.response.model_dump()
    
        #If the object is safe, then it doesn't need to be scanned.
        flagged = response_dict["results"][0]["flagged"]

        if flagged == False:
            return False
        
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

            return (categories, category_scores, top_three_dict, self.message, self.response)
        
    def information_info(self):
        
        url = "https://api.openai.com/v1/chat/completions"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_TOKEN}"
        }

        data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": f"Is {self.message} true. Please answer with only one word. True or False are the choices."}],
            "temperature": 0.5
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        answer = response.json()

        answer = answer["choices"][0]["message"]["content"]

        if answer == "False":
            answer = False
        else:
            return True

        print(type(answer),answer)

        return {"information": answer}