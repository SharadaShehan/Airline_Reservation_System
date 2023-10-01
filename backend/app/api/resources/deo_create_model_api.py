from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True)
parser.add_argument('seatsCount', type=dict, required=True)

class CreateModel(Resource):
    @jwt_required
    def post(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        if connection:
            try:
                cursor = connection.cursor()
                args = parser.parse_args()
                
                model_name = parser.parse_args()['name']
                cursor.execute("INSERT INTO model (name) VALUES (%s)", (model_name,))
                connection.commit()
                
                model_id = cursor.fetchone(0)
                
                seats_count = parser.parse_args()['Seats_Count']
                for class_name, count in seats_count.items():
                    cursor.execute("INSERT INTO capacity (Model, Class, Seats_Count) VALUES (%s, %s, %s)",
                                   (model_id, class_name, count))
                    connection.commit()

                connection.close()
                # Return a success response with a 201 status code
                return jsonify({'message': 'Model and capacity records created successfully'}), 201
            except Exception as ex:
                return abort(403, message=f"Failed to create model and capacity records. Error: {ex}")
        else:
            return abort(403, message="Failed to connect to the database")