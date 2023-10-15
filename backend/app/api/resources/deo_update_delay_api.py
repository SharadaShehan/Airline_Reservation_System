from flask import make_response
from app.utils.db import get_db_connection_staff
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_update_delay_data
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('scheduledFlightID', type=int, required=True)
parser.add_argument('delayMinutes', type=int, required=True)


class DEOupdateDelay(Resource):
    @jwt_required()
    def patch(self):
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete data or invalid JSON object")
                
                # Retrieve request data
                scheduledFlightID = request_data['scheduledFlightID']
                delayMinutes = request_data['delayMinutes']

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
                
                # Validate data
                if not validate_update_delay_data(scheduledFlightID, delayMinutes):
                    raise Exception("Invalid data")
                
                cursor.execute("UPDATE scheduled_flight SET Delay_Minutes = %s WHERE Scheduled_ID = %s", (delayMinutes, scheduledFlightID))

                connection.commit()
                connection.close()
                return make_response("Successfully updated the delay",200)

            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Account is not authorized to perform this action")
                return abort(400, message=f"Failed to update delay. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
