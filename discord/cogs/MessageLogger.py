import firebase_admin
from firebase_admin import credentials, firestore
from discord.ext import commands, tasks
from openai import OpenAI
import datetime
import os
import requests
import json

OPENAI_TOKEN = os.environ['openai']

# Use the service account
# cred = credentials.Certificate('firebase/ctrl-c-hacked2024-firebase-adminsdk-uevsn-c64338b9d8.json')
cred = credentials.Certificate('firebase/ctrl-c-moderating-tool-firebase-adminsdk-vmr5l-d27ae52cb6.json')

firebase_admin.initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')


class BanCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.check_database.start()
        
    def cog_unload(self):
        self.check_database.cancel()

    @tasks.loop(seconds=1.0)
    async def check_database(self):
        for guild in self.bot.guilds:
            for member in guild.members:
                doc_ref = db.collection('users').document(str(member.name))
                print(doc_ref.get().to_dict()['timeout_status'])
                if doc_ref.get().exists and doc_ref.get().to_dict()['ban_status']:
                    print(f"BANNING {member.name}")
                    try:
                        await member.ban()
                        print("BANNED!")
                    except:
                        print("ERROR BANNING")
                elif doc_ref.get().exists and doc_ref.get().to_dict()['kick_status']:
                    print(f"KICKING {member.name}")
                    try:
                        await member.kick()
                        print("KICKED!")
                        doc_ref.update({"kick_status": False})  # reset kick status
                    except:
                        print("ERROR KICKING")
#                 elif doc_ref.get().exists and doc_ref.get().to_dict()['timeout_status']:
#                     timeout_status = doc_ref.get().to_dict()['timeout_status']
#                     print(type(timeout_status))
#                     print(timeout_status)
#                     print(f"TIMEOUT {member.name}")
#                     try:
                        
#                         delta = datetime.timedelta(
#                             # days=50,
#                             # seconds=27,
#                             # microseconds=10,
#                             # milliseconds=29000,
#                             minutes=1,
#                             # hours=8,
#                             # weeks=2
#                         )
#                         # await member.timeout(delta)
#                         print(doc_ref.get().to_dict()['timeout_status'])
#                         print("TIMED OUT!")
#                         # doc_ref.update({"timeout_status": False})  # reset timeout status
#                     except:
#                         print("ERROR TIMING OUT")
                            

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
                        'number_of_messages_flagged_with_hate_speech': 0,
                        'ban_status': False,
                        'kick_status': False,
                        'timeout_status': False,
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
  await bot.add_cog(BanCog(bot))
            
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

             # Calculate total score for normalization.
            total_score = sum(category_scores.values())

            # Normalize scores and convert to percentage.
            category_percentages = {key: round((value / total_score) * 100, 3) for key, value in category_scores.items()}

             # Sort categories by percentage in descending order.
            sorted_categories = sorted(category_percentages.items(), key=lambda x: x[1], reverse=True)

            # Extract top three categories.
            top_three = sorted_categories[:3]
            top_three_dict = {item[0]: item[1] for item in top_three}

            print("top_three_dict: {}".format(top_three_dict))

            return (categories, category_scores, top_three_dict)
        
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