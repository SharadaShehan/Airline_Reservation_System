from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource
from app.utils.validators import validate_user_data

users = {
    1: "Tom"
}

class UserSimple(Resource):
    def get(self, user_id):

        connection = get_db_connection()
        cursor = connection.cursor()
        query = "SELECT * FROM city"
        cursor.execute(query)
        items = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(items)
    
        # return {'name': users.get(user_id, "User not found")}
    
