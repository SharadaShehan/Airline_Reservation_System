from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('origin', type=str, required=True)
parser.add_argument('destination', type=str, required=True)
parser.add_argument('durationMinutes', type=int, required=True)

class CreateRoute(Resource):
    @jwt_required 
    def post(self):
        current_user = get_jwt_identity()
        
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(403, message=f"Failed to connect to the database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                # Retrieve request data
                request_data = parser.parse_args()
                origin = request_data['origin']
                destination = request_data['destination']
                duration_minutes = request_data['durationMinutes']

                # Insert a new record into the 'route' table
                cursor.execute("INSERT INTO route (Origin, Destination, Duration_Minutes) VALUES (%s, %s, %s)",
                               (origin, destination, duration_minutes))
                connection.commit()

                connection.close()

                # Return a success response with a 201 status code
                return jsonify({'message': 'Route record created successfully'}), 201
            except Exception as ex:
                return abort(403, message=f"Failed to create route record. Error: {ex}")
        else:
            return abort(403, message="Failed to connect to the database")
