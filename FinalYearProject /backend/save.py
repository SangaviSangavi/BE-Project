from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import create_engine,case,cast
from dotenv import load_dotenv
from twilio.rest import Client
import requests
import os
app = Flask(__name__,static_folder='app',static_url_path="/app")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Blood.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# engine = create_engine('sqlite:///Blood.db')
db = SQLAlchemy(app)

class Donerdetails(db.Model):
    doner_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))  
    phnum = db.Column(db.String(10)) 
    bloodgroup = db.Column(db.String(10))  
    age = db.Column(db.Integer)  
    district = db.Column(db.String(100))  
    gender = db.Column(db.String(10)) 

    
class Patientdetails(db.Model):
    sno = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Patientname = db.Column(db.String(100))  
    Contactnum = db.Column(db.String(10))  
    Hospitalname = db.Column(db.String(100))  
    HospitalContactnum = db.Column(db.String(10))  
    Disease = db.Column(db.String(100))  
    bloodgroup1 = db.Column(db.String(10)) 
    age1 = db.Column(db.Integer)  
    district1 = db.Column(db.String(100))  
    gender1 = db.Column(db.String(10))  

        
    
@app.route('/save_Registerdata', methods=['POST'])
def save_Registerdata(): 
    try:
        data = request.json
       
        if len(data['phnum']) != 10 or not data['phnum'].isdigit():
            return jsonify({'error': 'Phone number must be 10 digits'}), 400

        RegData = Donerdetails(
            name=data['name'],
            phnum=data['phnum'],
            bloodgroup=data['bloodgroup'],
            age=data['age'],
            district=data['district'],
            gender=data['gender']
        )
        donernumber=data.get('phnum')
        existing_num = Donerdetails.query.filter_by(phnum=donernumber).first()
        if existing_num:
            return jsonify({'error:Mobile number already registerd try another number'})
        db.session.add(RegData)
        db.session.commit()
        return jsonify({'message': 'Data saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
   

   
# Firebase Cloud Messaging credentials
fcm_server_key = 'your_fcm_server_key'

# Firebase Cloud Messaging API URL
fcm_api_url = 'https://fcm.googleapis.com/fcm/send'
    


# Save Patient Registration Data
@app.route('/save_PatientRegisterdata', methods=['POST'])
def save_PatientRegisterdata():
    try:
        data = request.json
        
        # Validating Contact Numbers (Length and Numeric Check)
        if len(data['Contactnum']) != 10 or not data['Contactnum'].isdigit():
            return jsonify({'error': 'Contact number must be 10 digits'}), 400
        if len(data['HospitalContactnum']) != 10 or not data['HospitalContactnum'].isdigit():
            return jsonify({'error': 'Hospital Contact number must be 10 digits'}), 400

        # Add Patient Data to Patientdetails
        PatientRegData = Patientdetails(
            Patientname=data['Patientname'],
            Contactnum=data['Contactnum'],
            Hospitalname=data['Hospitalname'],
            HospitalContactnum=data['HospitalContactnum'],
            Disease=data['Disease'],
            bloodgroup1=data['bloodgroup1'],
            age1=data['age1'],
            district1=data['district1'],
            gender1=data['gender1']
        )
        db.session.add(PatientRegData)
        db.session.commit()



        return jsonify({'message': 'Data saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


# Route to send details
# @app.route('/send_details', methods=['GET'])
# def send_details():
#     try:
#         # Get the most recent entry from the 'Patientdetails' table
#         latest_patient_entry = Patientdetails.query.order_by(Patientdetails.sno.desc()).first()  # Assuming 'sno' is the primary key

#         if not latest_patient_entry:
#             return jsonify({'error': 'No data found in Patientdetails'}), 404

#         # Retrieve the necessary data from the latest row in 'Patientdetails'
#         bloodgroup1 = latest_patient_entry.bloodgroup1  # Assuming 'bloodgroup1' is a column in Patientdetails
#         district1 = latest_patient_entry.district1      # Assuming 'district1' is a column in Patientdetails

#         # Check for matching donors in Donerdetails table based on the latest 'Patientdetails' data
#         matching_donors = Donerdetails.query.filter(
#             Donerdetails.bloodgroup == bloodgroup1,
#             Donerdetails.district == district1
#         ).all()

#         if not matching_donors:
#             return jsonify({'message': 'No matching donors found'}), 404

#         # If there are matching donors, send a push notification to each donor
#         for donor in matching_donors:
#             # Assuming 'patient_data' is a dictionary-like structure from the latest_patient_entry
#             send_push_notification(donor.fcm_token, latest_patient_entry.patient_data)  # Donor should have an FCM token instead of a phone number

#         return jsonify({'message': 'Data sent successfully'}), 201

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# # Function to send a push notification using Firebase Cloud Messaging (FCM)
# def send_push_notification(fcm_token, patient_data):
#     try:
#         fcm_key = os.getenv('AIzaSyDLPp9IcnjEmU0EdzXHL2QBp3klmuICb-k')
#         # Prepare the message payload
#         message = {
#             "to": fcm_token,  # Use the FCM registration token of the donor (fcm_token is required)
#             "notification": {
#                 "title": "Urgent Blood Donation Request",
#                 "body": f"Patient Name: {patient_data['Patientname']}\n"
#                         f"Age: {patient_data['age1']}\n"
#                         f"Disease: {patient_data['Disease']}\n"
#                         f"Contact Number: {patient_data['Contactnum']}\n"
#                         f"We have a patient in need of blood matching your type. Please visit {patient_data['Hospitalname']} hospital."
#             }
#         }

#         # FCM Headers
#         headers = {
#             "Content-Type": "application/json",
#             "Authorization": f"key={fcm_key}",  # Replace with your actual FCM server key
#         }

#         # Send the message via POST request to FCM API
#         response = requests.post(fcm_api_url, json=message, headers=headers)

#         if response.status_code == 200:
#             print(f"Push notification sent to {fcm_token}")
#         else:
#             print(f"Failed to send push notification to {fcm_token}: {response.text}")

#     except Exception as e:
#         print(f"Failed to send push notification to {fcm_token}: {str(e)}")

@app.route('/send_details', methods=['GET'])
def send_details():
    try:
        # Get the most recent entry from the 'Patientdetails' table
        latest_patient_entry = Patientdetails.query.order_by(Patientdetails.sno.desc()).first()

        if not latest_patient_entry:
            return jsonify({'error': 'No data found in Patientdetails'}), 404

        # Retrieve the necessary data from the latest row in 'Patientdetails'
        bloodgroup1 = latest_patient_entry.bloodgroup1
        district1 = latest_patient_entry.district1

        # Check for matching donors in Donerdetails table based on the latest 'Patientdetails' data
        matching_donors = Donerdetails.query.filter(
            Donerdetails.bloodgroup == bloodgroup1,
            Donerdetails.district == district1
        ).all()

        if not matching_donors:
            return jsonify({'message': 'No matching donors found'}), 404

        # If there are matching donors, send a message to each donor
        for donor in matching_donors:
            # Assuming donor has a 'phnum' field for SMS
            phnumber = donor.phnum
            send_sms(phnumber, latest_patient_entry)

        return jsonify({'message': 'Data sent successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

load_dotenv()  
# Function to send an SMS using Twilio
def send_sms(phnumber, latest_patient_entry):
    try:
        # Retrieve Twilio credentials from environment variables
        twilio_sid = 'AC0aadbadbfbb02b4f91fa3907bd063b84'  # Twilio Account SID
        twilio_auth_token = '3e4d2940fd04ae603441adabe9c78881'  # Twilio Auth Token
        twilio_phone_number = '+18102020710'  # Twilio phone number

        # Validate that the Twilio credentials are loaded correctly
        if not all([twilio_sid, twilio_auth_token, twilio_phone_number]):
            print("Twilio credentials are missing.")
            print('twilio_sid',twilio_sid)
            print('twilio_auth_token',twilio_auth_token)
            print('twilio_phone_number',twilio_phone_number)  
            return

        # Initialize Twilio client
        client = Client(twilio_sid, twilio_auth_token)

        # Prepare the SMS message
        message_body = (
            f"Urgent Blood Donation Request\n"
            f"Patient Name: {latest_patient_entry.Patientname}\n"
            f"Age: {latest_patient_entry.age1}\n"
            f"Disease: {latest_patient_entry.Disease}\n"
            f"Contact Number: {latest_patient_entry.Contactnum}\n"
            f"We have a patient in need of blood matching your type. "
            f"Please visit {latest_patient_entry.Hospitalname} hospital."
        )

        # Ensure that the phone number is in the correct format (including country code)
        if not phnumber.startswith('+'):
            phnumber = '+91' + phnumber  # Add '+' if it's missing, adjust accordingly if needed

        # Send SMS
        message = client.messages.create(
            body=message_body,
            from_=twilio_phone_number,  # Twilio phone number
            to=phnumber  # Donor's phone number
        )

        print(f"SMS sent to {phnumber}: {message.sid}")

    except Exception as e:
        print(f"Failed to send SMS to {phnumber}: {str(e)}")



@app.route('/Donertable', methods=['GET'])
def Donertable():
    recipes = Donerdetails.query.all()  
    recipes_data = [{'doner_id': recipe.doner_id, 
                     'name': recipe.name,
                     'phnum': recipe.phnum, 
                     'bloodgroup': recipe.bloodgroup,  
                     'age': recipe.age, 
                     'district': recipe.district,
                     'gender': recipe.gender
                     } for recipe in recipes]

    return jsonify(recipes_data)   

@app.route('/Patienttable', methods=['GET'])
def Patienttable():
    
    recipes = Patientdetails.query.all()
    recipes_data = [{'sno':recipe.sno, 
                     'Patientname':recipe.Patientname,
                     'Hospitalname':recipe.Hospitalname, 
                     'HospitalContactnum':recipe.HospitalContactnum,
                     'Disease':recipe.Disease, 
                     'bloodgroup1':recipe.bloodgroup1,
                     'age1':recipe.age1,
                     'district1':recipe.district1,
                     'gender1':recipe.gender1,
                     'Contactnum':recipe.Contactnum
                     
                     } for recipe in recipes]

    return jsonify(recipes_data)     
           
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)    