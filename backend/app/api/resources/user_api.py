from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True)
parser.add_argument('password', type=str, required=True)


class GetAuthToken(Resource):
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
                        Username, 
                        Password, 
                        FirstName, 
                        LastName, 
                        Category_Name, 
                        IsAdmin, 
                        IsDataEntryOperator 
                    FROM 
                        User JOIN Category on User.Category = Category.Category_ID
                    WHERE Username = %s
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
                                'category': items[4],
                                'isAdmin': items[5],
                                'isDataEntryOperator': items[6]
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
                        Username, 
                        FirstName, 
                        LastName, 
                        Category_Name, 
                        IsAdmin, 
                        IsDataEntryOperator
                    FROM 
                        User JOIN Category on User.Category = Category.Category_ID
                    WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(username,))
                items = cursor.fetchone()
                connection.close()

                if items is None:
                    return abort(500, message="No User Found with credentials")
                else:
                    response = {
                        'username': items[0],
                        'firstName': items[1],
                        'lastName': items[2],
                        'category': items[3],
                        'isAdmin': items[4],
                        'isDataEntryOperator': items[5]
                    }
                return make_response(response, 200)
            
            except Exception as ex:
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")

