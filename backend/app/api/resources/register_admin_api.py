from flask import make_response
from app.utils.db import get_db_connection_admin
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_staff_register_data
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True)
parser.add_argument('password', type=str, required=True)
parser.add_argument('firstname', type=str, required=True)
parser.add_argument('lastname', type=str, required=True)


class RegisterAdmin(Resource):
    @jwt_required()
    def post(self):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete user data or invalid JSON object")
                
                current_user = get_jwt_identity()

                # Check if current user is admin
                cursor.execute("SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'", (current_user,))
                userfetched = cursor.fetchone()
                if userfetched is None:
                    raise Exception("403")
                
                username = args['username']
                password = args['password']
                firstname = args['firstname']
                lastname = args['lastname']

                # Validate user data
                if not validate_staff_register_data(username, password, firstname, lastname):
                    raise Exception("Invalid user data")
                
                # Check if username already exists
                cursor.execute("SELECT * FROM user WHERE Username = %s", (username,))
                userfetched = cursor.fetchone()
                if userfetched is not None:
                    raise Exception("Username already exists")
                
                # Check if username is NULL
                if username == 'NULL':
                    raise Exception("Username cannot be NULL")
                
                # Register admin
                hashed_password = generate_password_hash(password.strip(), method='scrypt')
                cursor.execute("""
                    INSERT INTO user (Username, Password, FirstName, LastName) VALUES (%s, %s, %s, %s)""", (username, hashed_password, firstname, lastname))
                cursor.execute("""
                    INSERT INTO staff (Username, Role) VALUES (%s, 'Admin')""", (username,))
                connection.commit()
                connection.close()

                return make_response({"message": "User registered successfully"}, 201)
            
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can register new admins")
                return abort(400, message=f"Failed to register user. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")
