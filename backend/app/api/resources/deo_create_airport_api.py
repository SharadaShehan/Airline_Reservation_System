from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_airport_data
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('ICAO', type=str, required=True)
parser.add_argument('IATA', type=str, required=True)
parser.add_argument('location', type=str, required=True, action='append')


class CreateAirport(Resource):
    @jwt_required()
    def post(self):
        
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete airport data or invalid JSON object")
                
                # check if user is data entry operator
                current_user = get_jwt_identity()
                cursor.execute(f"SELECT IsDataEntryOperator FROM user WHERE Username = '{current_user}'")
                is_deo = cursor.fetchone()[0]

                if is_deo != 1:
                    raise Exception("403")
                
                # Retrieve request data
                ICAO = request_data['ICAO']
                IATA = request_data['IATA']
                location_list = request_data['location']

                # Validate airport data
                if not validate_airport_data(ICAO, IATA, location_list):
                    raise Exception("Invalid airport data")

                # Insert a new record into the 'airport' table
                cursor.execute("INSERT INTO airport (ICAO_Code, IATA_Code) VALUES (%s, %s)", (ICAO, IATA))
                connection.commit()

                try:
                    # Insert records into the 'location' table for each location in 'location_list'
                    for idx, location_text in enumerate(location_list):
                        cursor.execute("INSERT INTO location (Airport, level, name) VALUES (%s, %s, %s)",
                                    (ICAO, idx, location_text))
                        connection.commit()
                except Exception:
                    # Delete the record from the 'airport' table if insertion into 'location' table fails
                    cursor.execute(f"DELETE FROM airport WHERE ICAO_Code = '{ICAO}'")
                    connection.commit()
                    raise Exception("Failed to insert location records")

                connection.close()
                
                return make_response({'message': 'Airport and location records created successfully'}, 201)
            except Exception as ex:
                return abort(400, message=f"Failed to create airport. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to the database")

