from flask import make_response
from app.utils.db import get_db_connection_staff
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_airport_data
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

parser = reqparse.RequestParser()
parser.add_argument('ICAO', type=str, required=True)
parser.add_argument('IATA', type=str, required=True)
parser.add_argument('location', type=str, required=True, action='append')


class CreateAirport(Resource):
    @jwt_required()
    def post(self):
        
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")

        if connection:
            try:
                connection.autocommit = False
                cursor = connection.cursor()

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete airport data or invalid JSON object")
                
                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Data Entry Operator'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # Retrieve request data
                ICAO = request_data['ICAO']
                IATA = request_data['IATA']
                location_list = request_data['location']

                # Validate airport data
                if not validate_airport_data(ICAO, IATA, location_list):
                    raise Exception("Invalid airport data")
                
                locations_json = json.dumps(location_list)

                # Create airport
                procedureStatus = 0
                result_args = cursor.callproc('CreateAirport', (ICAO, IATA, locations_json, 0))
                procedureStatus = result_args[-1]

                if procedureStatus == 1:
                    connection.commit()
                    connection.close()
                else:
                    raise Exception("Invalid airport data")

                return make_response({'message': 'Airport and location records created successfully'}, 201)
            except Exception as ex:
                connection.rollback()
                connection.close()
                if str(ex) == "403":
                    return abort(403, message="Only data entry operators can create airport records")
                return abort(400, message=f"Failed to create airport. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")

