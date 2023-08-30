from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort
from app.utils.validators import validate_user_data


# Class defined to make REST API calls to access users details
class UserSimple(Resource):
    # GET method to get user with id = user_id
    def get(self, user_id):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                # Generate SQL query to get user
                query = "SELECT username, email FROM users where id = %s"
                # Execute query with id = user_id
                cursor.execute(query,(user_id,))    # parameter values must be in a tuple
                items = cursor.fetchone()
                connection.close()
                return jsonify({'username': items[0], 'email': items[1]})   # 'items' is a tuple with elements (username, email)
            except Exception as ex:
                return abort(400, message=f"Failed to get user. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")
    
