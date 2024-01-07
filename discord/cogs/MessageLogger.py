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
cred = credentials.Certificate('firebase/ctrl-c-hacked2024-firebase-adminsdk-uevsn-c64338b9d8.json')
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
        misinformation_info = message1.misinformation_info()  # (categories, category_scores, top_three_dict)
        
        if hate_info != False:
            print("hate_info: {}".format(hate_info))
            print("type(hate_info[0]): {}".format(type(hate_info[0])))
            print("(hate_info[0]): {}".format((hate_info[0])))
            message_dict = dict()
            message_id = str(message.created_at)
            print("message_id: {}", message_id)
            message_dict["categories"] = hate_info[0]
            message_dict["category_scores"] = hate_info[1]
            message_dict["top_three_dict"] = hate_info[2]
            message_dict["user_ID"] = message.author.name
            message_dict["message"] = message.content
            message_dict["timestamp"] = str(message.created_at)
            
            db.collection("messages").document(message_id).set(message_dict)
            print("done")
            
        elif misinformation_info != True:
            print("misinformation_info: {}".format(misinformation_info))
            message_dict = dict()
            message_id = str(message.created_at)
            print("message_id: {}", message_id)
            message_dict["user_ID"] = message.author.name
            message_dict["message"] = message.content
            message_dict["timestamp"] = str(message.created_at)
            message_dict["misinformation"] = "True"
            
            db.collection("messages").document(message_id).set(message_dict)
            print("done")

    @commands.Cog.listener()
    async def on_ready(self):
        print(f'We have logged in as {self.bot.user}')
        print("self.bot.guilds: {}".format(self.bot.guilds))
        for guild in self.bot.guilds:
            print("guild.members: {}".format(guild.members))
            for member in guild.members:
                # Store each username in Firestore
                doc_ref = db.collection('users').document(str(member.id))
                doc_ref.set({
                    'username': member.name,
                    'discriminator': member.discriminator
                })
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
        
    def misinformation_info(self):
        
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