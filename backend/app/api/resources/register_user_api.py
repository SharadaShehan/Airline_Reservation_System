from flask import jsonify, make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_register_data
from werkzeug.security import generate_password_hash

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True)
parser.add_argument('password', type=str, required=True)
parser.add_argument('firstname', type=str, required=True)
parser.add_argument('lastname', type=str, required=True)


class RegisterUser(Resource):
    def post(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete user data or invalid JSON object")
                
                username = args['username']
                password = args['password']
                firstname = args['firstname']
                lastname = args['lastname']

                # Validate user data
                if not validate_user_register_data(username, password, firstname, lastname):
                    raise Exception("Invalid user data")
                
                # Check if username already exists
                cursor.execute(f"SELECT * FROM user WHERE Username = '{username}'")
                usernamefetched = cursor.fetchone()
                if usernamefetched is not None:
                    raise Exception("Username already exists")
                
                # Check if username is NULL
                if username == 'NULL':
                    raise Exception("Username cannot be NULL")
                
                # Register user
                hashed_password = generate_password_hash(password.strip(), method='scrypt')
                cursor.execute(f"INSERT INTO user (Username, Password, FirstName, LastName, IsAdmin, IsDataEntryOperator) VALUES ('{username}', '{hashed_password}', '{firstname}', '{lastname}', 0, 0)")
                connection.commit()

                connection.close()

                return make_response(jsonify({"message": "User registered successfully"}), 201)
            
            except Exception as ex:
                return abort(400, message=f"Failed to register user. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")
        
