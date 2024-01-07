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
            message_dict = dict()
            message_id = str(message.created_at)
            message_dict["username"] = message.author.name
            message_dict["message"] = message.content
            message_dict["timestamp"] = str(message.created_at)
            message_dict["categories"] = hate_info[0]
            message_dict["category_scores"] = hate_info[1]
            message_dict["top_three_dict"] = hate_info[2]
            message_dict["1st_violation_percentage"] = hate_info[3]
            message_dict["2nd_violation_percentage"] = hate_info[4]
            message_dict["3rd_violation_percentage"] = hate_info[5]
            db.collection("messages").document(message_id).set(message_dict)
            #print("hate message logged")
            
            db.collection("users")
            user_ref = db.collection("users").document(message.author.name)
            user_ref.update({"number_of_messages_flagged_with_hate_speech": firestore.Increment(1)})
            #print("hate user logged")
            
        elif misinformation_info != True:
            message_dict = dict()
            message_id = str(message.created_at)
            message_dict["username"] = message.author.name
            message_dict["message"] = message.content
            message_dict["timestamp"] = str(message.created_at)
            message_dict["misinformation"] = "True"
            db.collection("messages").document(message_id).set(message_dict)
            #print("misinformation message logged")
            
            db.collection("users")
            user_ref = db.collection("users").document(message.author.name)
            user_ref.update({"number_of_messages_flagged_with_misinformation": firestore.Increment(1)})
            #print("misinformation user logged")
            
    @commands.Cog.listener()
    async def on_ready(self):
        #print(f'We have logged in as {self.bot.user}')
        #print("self.bot.guilds: {}".format(self.bot.guilds))
        for guild in self.bot.guilds:
            #print("guild.members: {}".format(guild.members))
            for member in guild.members:
                # Store each username in Firestore
                doc_ref = db.collection('users').document(str(member.name))
                if not (doc_ref.get()).exists:
                    doc_ref.set({
                        'id': member.id,
                        'discriminator': member.discriminator,
                        'number_of_messages_flagged_with_misinformation': 0, 
                        'number_of_messages_flagged_with_hate_speech': 0 
                    })
    
    @commands.Cog.listener()
    async def on_member_join(self, member):
        doc_ref = db.collection('users').document(str(member.name))
        if not (doc_ref.get()).exists:
            doc_ref.set({
                'id': member.id,
                'discriminator': member.discriminator,
                'number_of_messages_flagged_with_misinformation': 0, 
                'number_of_messages_flagged_with_hate_speech': 0 
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
            top_three_total = 0
            
            
            for index, element in enumerate(top_three_list):
                key = element[1]
                value = element[0]
                top_three_dict[key] = value
                top_three_total += value

            first_hate_val = top_three_list[0][0]
            second_hate_val = top_three_list[1][0]
            third_hate_val = top_three_list[2][0]

            first_hate_percent = round(first_hate_val/top_three_total,3)*100
            second_hate_percent = round(second_hate_val/top_three_total,3)*100
            third_hate_percent = round(third_hate_val/top_three_total,3)*100

            print(first_hate_percent,second_hate_percent,third_hate_percent)

            return(categories, category_scores, top_three_dict, first_hate_percent, second_hate_percent, third_hate_percent)
        
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

        return {"information": answer}