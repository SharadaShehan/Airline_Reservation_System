from flask import make_response, request
from app.utils.db import get_db_connection_guest_user
from flask_restful import Resource, abort
from app.utils.validators import validate_flight_id


class GetFlightByID(Resource):
    def get(self, flight_id):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Validate search parameters
                if not validate_flight_id(int(flight_id)):
                    raise Exception("Invalid search parameters")
                
                # Get all flights for given parameters
                cursor.execute("""SELECT 
                               originIATA,
                               originAddress,
                               departureDateAndTime,
                               destinationIATA,
                               destinationAddress,
                               arrivalDateAndTime,
                               durationMinutes,
                               airplaneModel
                               FROM flight WHERE ID = %s;""", (flight_id,))
                query_result = cursor.fetchone()

                # Check if no flights found
                if not query_result:
                    raise Exception("404")
                
                response = {
                    "originIATA": query_result[0],
                    "originAddress": query_result[1],
                    "departureDateAndTime": query_result[2],
                    "destinationIATA": query_result[3],
                    "destinationAddress": query_result[4],
                    "arrivalDateAndTime": query_result[5],
                    "durationMinutes": query_result[6],
                    "airplaneModel": query_result[7]
                }

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"No Flight found for given ID")
                print(ex)
                return abort(400, message=f"Failed to get Flight. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")
