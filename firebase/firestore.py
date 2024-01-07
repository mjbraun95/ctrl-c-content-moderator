import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the service account
cred = credentials.Certificate('./ctrl-c-hacked2024-firebase-adminsdk-uevsn-c64338b9d8.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

data = {"name": "Los Angeles", "state": "CA", "country": "USA"}

print("type(data): {}".format(type(data)))
# Add a new doc in collection 'cities' with ID 'LA'
db.collection("messages").document("LA").set(data)
db.collection("users").document("LA").set(data)