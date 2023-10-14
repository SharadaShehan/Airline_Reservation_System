from flask import make_response
from app.utils.db import get_db_connection_registered_user
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_register_data
from werkzeug.security import generate_password_hash

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True)
parser.add_argument('password', type=str, required=True)
parser.add_argument('firstname', type=str, required=True)
parser.add_argument('lastname', type=str, required=True)
parser.add_argument('passportID', type=str, required=True)
parser.add_argument('address', type=str, required=True)
parser.add_argument('birthDate', type=str, required=True)
parser.add_argument('gender', type=str, required=True)
parser.add_argument('email', type=str, required=True)
parser.add_argument('contactNumber', type=str, required=True)


class RegisterUser(Resource):
    def post(self):
        try:
            connection = get_db_connection_registered_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete user data or invalid JSON object")
                
                username = args['username']
                password = args['password']
                firstname = args['firstname']
                lastname = args['lastname']
                passportID = args['passportID']
                address = args['address']
                birthDate = args['birthDate']
                gender = args['gender']
                email = args['email']
                contactNumber = args['contactNumber']

                # Validate user data
                if not validate_user_register_data(username, password, firstname, lastname, passportID, address, birthDate, gender, email, contactNumber):
                    raise Exception("Invalid user data")

                # Check if username already exists
                cursor.execute("SELECT * FROM user WHERE Username = %s", (username,))
                userfetched = cursor.fetchone()
                if userfetched is not None:
                    raise Exception("Username already exists")

                # Check if username is NULL
                if username == 'NULL':
                    raise Exception("Username cannot be NULL")
                
                # Register user
                hashed_password = generate_password_hash(password.strip(), method='scrypt')
                cursor.execute("""
                    INSERT INTO user (Username, Password, FirstName, LastName) VALUES (%s, %s, %s, %s)""", (username, hashed_password, firstname, lastname))
                cursor.execute("""
                    INSERT INTO registered_user (Username, Passport_ID, Address, Birth_Date, Gender, Email, Contact_Number)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)""", (username, passportID, address, birthDate, gender, email, contactNumber))
                connection.commit()
                connection.close()

                return make_response({"message": "User registered successfully"}, 201)
            
            except Exception as ex:
                return abort(400, message=f"Failed to register user. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized access")
    
