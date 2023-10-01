from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('Tail_Number', type=str, required=True)
parser.add_argument('Model', type=int, required=True)

class CreateAirplane(Resource):
    @jwt_required  
    def post(self):
        current_user = get_jwt_identity()
        
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()

                # Retrieve request data
                request_data = parser.parse_args()
                tail_number = request_data['Tail_Number']
                model_id = request_data['Model']

                # Insert a new record into the 'airplane' table
                cursor.execute("INSERT INTO airplane (Tail_Number, Model) VALUES (%s, %s)",
                               (tail_number, model_id))
                connection.commit()

                connection.close()
                
                return jsonify({'message': 'Airplane record created successfully'}), 201
            except Exception as ex:
                return abort(403, message=f"Failed to create airplane record. Error: {ex}")
        else:
            return abort(403, message="Failed to connect to the database")