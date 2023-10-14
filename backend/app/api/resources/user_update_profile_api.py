from flask import make_response
from app.utils.db import get_db_connection_registered_user
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_update_data_with_password, validate_user_update_data_without_password
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('firstname', type=str, required=True)
parser.add_argument('lastname', type=str, required=True)
parser.add_argument('currentPassword', type=str, required=False)
parser.add_argument('newPassword', type=str, required=False)
parser.add_argument('passportID', type=str, required=True)
parser.add_argument('address', type=str, required=True)
parser.add_argument('birthDate', type=str, required=True)
parser.add_argument('gender', type=str, required=True)
parser.add_argument('email', type=str, required=True)
parser.add_argument('contactNumber', type=str, required=True)


class UpdateUser(Resource):
    @jwt_required()
    def patch(self):
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
                
                firstname = args['firstname']
                lastname = args['lastname']
                current_password = args['currentPassword']
                new_password = args['newPassword']
                passportID = args['passportID']
                address = args['address']
                birthDate = args['birthDate']
                gender = args['gender']
                email = args['email']
                contactNumber = args['contactNumber']
                
                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM registered_user WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")

                if current_password is None or new_password is None:
                    # Validate user data
                    if not validate_user_update_data_without_password(firstname, lastname, passportID, address, birthDate, gender, email, contactNumber):
                        raise Exception("Invalid user data")
                    
                    # update user
                    cursor.execute("UPDATE user SET FirstName = %s, LastName = %s WHERE Username = %s",(firstname, lastname, current_user))
                    cursor.execute("UPDATE registered_user SET Passport_ID = %s, Address = %s, Birth_Date = %s, Gender = %s, Email = %s, Contact_Number = %s WHERE Username = %s", (passportID, address, birthDate, gender, email, contactNumber, current_user))
                else:
                    # Validate user data
                    if not validate_user_update_data_with_password(firstname, lastname, current_password, new_password, passportID, address, birthDate, gender, email, contactNumber):
                        raise Exception("Invalid user data")
                    
                    # Check if current password is correct
                    cursor.execute("SELECT Password FROM user WHERE Username = %s",(current_user,))
                    passwordfetched = cursor.fetchone()
                    if passwordfetched is None:
                        raise Exception("Invalid username")
                    if not check_password_hash(passwordfetched[0], current_password):
                        raise Exception("Incorrect password")
                    
                    # update user
                    hashed_password = generate_password_hash(new_password.strip(), method='scrypt') 
                    cursor.execute("UPDATE user SET FirstName = %s, LastName = %s, Password = %s WHERE Username = %s",(firstname, lastname, hashed_password, current_user))
                    cursor.execute("UPDATE registered_user SET Passport_ID = %s, Address = %s, Birth_Date = %s, Gender = %s, Email = %s, Contact_Number = %s WHERE Username = %s", (passportID, address, birthDate, gender, email, contactNumber, current_user))
                
                connection.commit()
                connection.close()

                return make_response({"message": "User updated successfully"}, 200)
            
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Unauthorized access to Passenger User API")
                return abort(400, message=f"Failed to update user. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")
        
