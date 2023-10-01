from flask import jsonify, make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_scheduling_data
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import datetime


parser = reqparse.RequestParser()
parser.add_argument('scheduledFlightID', type=int, required=True)
parser.add_argument('delayMinutes', type=int, required=True)

class DEOupdateDelay(Resource):
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
                if not query_result or query_result[0] != 1:  # Check if query_result is None
                    raise Exception("403")

                # Retrieve request data
                request_data = parser.parse_args()
                scheduledFlightID = request_data['scheduledFlightID']
                delayMinutes = request_data['delayMinutes']

                
                cursor.execute("UPDATE scheduled_flight SET Delay_Minutes = %s WHERE Scheduled_ID = %s",
                               (delayMinutes, scheduledFlightID))
                

                connection.commit()
                connection.close()
                return make_response("Successfully updated the delay",200)

            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Account is not authorized to schedule flights")
                elif str(ex) == "Flight not found":
                    return abort(404, message="Flight not found")
                return abort(400, message=f"Failed to schedule flight. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to the database")
