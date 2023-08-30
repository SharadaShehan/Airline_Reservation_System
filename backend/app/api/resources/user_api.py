from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource
from app.utils.validators import validate_user_data


class UserSimple(Resource):
    def get(self, user_id):
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()
            query = "SELECT username, email FROM users where id = %s"
            cursor.execute(query,(user_id,))
            items = cursor.fetchone()
            connection.close()
            return jsonify({'username': items[0], 'email': items[1]})
        else:
            return {'name': users.get(user_id, "User not found")}
    
