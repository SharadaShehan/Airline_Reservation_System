from flask import jsonify, make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_scheduling_data
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('route', type=int, required=True)
parser.add_argument('airplane', type=str, required=True)
parser.add_argument('departureDate', type=str, required=True)
parser.add_argument('departureTime', type=str, required=True)


class DEOScheduleFlight(Resource):
    @jwt_required()
    def post(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                username = get_jwt_identity()
                cursor.execute(f"SELECT IsDataEntryOperator FROM user WHERE Username = '{username}'")
                query_result = cursor.fetchone()
                
                # Check if user is a data entry operator
                if query_result[0] != 1:
                    raise Exception("403")
                
                # Retrieve request data
                request_data = parser.parse_args()
                route = request_data['route']
                airplane = request_data['airplane']
                departure_date = request_data['departureDate']
                departure_time = request_data['departureTime']

                # Validate scheduling data
                if not validate_scheduling_data(route, airplane, departure_date, departure_time):
                    raise Exception("Invalid scheduling data")
                
                departure_time = departure_time + ":00"

                # Insert a new record into the 'scheduled_flight' table
                procedureStatus = 0
                result_args = cursor.callproc('ScheduleFlight', [route, airplane, departure_date, departure_time, 0])
                procedureStatus = result_args[-1]
                
                connection.commit()
                connection.close()

                if procedureStatus == 1:
                    return make_response({'message': 'Flight Scheduled successfully'}, 201)
                else:
                    raise Exception("Failed to schedule flight")
                
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Account is not authorized to schedule flights")
                return abort(400, message=f"Failed to schedule flight. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to the database")


