from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('ICAO', type=str, required=True)
parser.add_argument('IATA', type=str, required=True)
parser.add_argument('location', type=list, required=True, location='json')

class CreateAirport(Resource):
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
                ICAO = request_data['ICAO']
                IATA = request_data['IATA']
                location_list = request_data['location']

                # Insert a new record into the 'airport' table
                cursor.execute("INSERT INTO airport (ICAO_Code, IATA_Code) VALUES (%s, %s)", (ICAO, IATA))
                connection.commit()

                airport_id = cursor.fetchone(0)

                # Insert records into the 'location' table for each location in 'location_list'
                for idx, location_text in enumerate(location_list):
                    cursor.execute("INSERT INTO location (Airport, level, name) VALUES (%s, %s, %s)",
                                   (airport_id, idx, location_text))
                    connection.commit()

                connection.close()
                
                return jsonify({'message': 'Airport and location records created successfully'}), 201
            except Exception as ex:
                return abort(403, message=f"Failed to create airport and location records. Error: {ex}")
        else:
            return abort(403, message="Failed to connect to the database")

