from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True)
parser.add_argument('password', type=str, required=True)


class UserGetAuthToken(Resource):
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

                # Validate user data
                if not validate_user_data(username, password):
                    raise Exception("Invalid user data")

                # SQL query to get user
                query = """
                    SELECT 
                        usr.Username, 
                        usr.Password, 
                        usr.FirstName, 
                        usr.LastName, 
                        regusr.Passport_ID,
                        regusr.Address,
                        ctg.Category_Name,                         
                        regusr.Birth_Date,
                        regusr.Gender,
                        regusr.Email,
                        regusr.Contact_Number,
                        regusr.Bookings_Count
                    FROM 
                        registered_user AS regusr
                        JOIN user_category AS ctg ON regusr.Category = ctg.Category_ID
                        JOIN user AS usr ON regusr.Username = usr.Username
                    WHERE regusr.Username = %s
                """

                # Execute query with username
                cursor.execute(query,(username,))    # parameter values must be in a tuple
                items = cursor.fetchone()
                connection.close()

                if items is None:
                    return make_response({"message": "Invalid username or password"}, 401)
                else:
                    if check_password_hash(items[1], password):
                        access_token = create_access_token(identity=username)
                        response_data = {
                            'access_token': access_token,
                            'userData': {
                                'username': items[0],
                                'firstName': items[2],
                                'lastName': items[3],
                                'passportId': items[4],
                                'address': items[5],
                                'category': items[6],
                                'birthDate': items[7],
                                'gender': items[8],
                                'email': items[9],
                                'contactNumber': items[10],
                                'bookingsCount': items[11]
                            }
                        }
                        return make_response(response_data, 200)
                    else:
                        return make_response({"message": "Invalid username or password"}, 401)
                    
            except Exception as ex:
                return abort(400, message=f"Failed to get user. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")


class GetUserDetails(Resource):
    @jwt_required()     # check if user is jwt authenticated
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                username = get_jwt_identity()    # get username from jwt token
                # SQL query to get user details
                query = """
                    SELECT 
                        usr.Username,
                        usr.FirstName, 
                        usr.LastName, 
                        regusr.Passport_ID,
                        regusr.Address,
                        ctg.Category_Name,                         
                        regusr.Birth_Date,
                        regusr.Gender,
                        regusr.Email,
                        regusr.Contact_Number,
                        regusr.Bookings_Count
                    FROM 
                        registered_user AS regusr
                        JOIN user_category AS ctg ON regusr.Category = ctg.Category_ID
                        JOIN user AS usr ON regusr.Username = usr.Username
                    WHERE regusr.Username = %s
                """

                # Execute query with username
                cursor.execute(query,(username,))
                items = cursor.fetchone()
                connection.close()

                if items is None:
                    return abort(403, message="Unauthorized access to user account")
                else:
                    response = {
                        'username': items[0],
                        'firstName': items[1],
                        'lastName': items[2],
                        'passportId': items[3],
                        'address': items[4],
                        'category': items[5],
                        'birthDate': items[6],
                        'gender': items[7],
                        'email': items[8],
                        'contactNumber': items[9],
                        'bookingsCount': items[10]
                    }
                return make_response(response, 200)
            
            except Exception as ex:
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")

