from flask import make_response, request
from app.utils.db import get_db_connection_guest_user
from flask_restful import Resource, abort
from app.utils.validators import validate_seat_search_parameters


class GetAvailableSeats(Resource):
    def get(self, flight_id):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                className = request.args.get('className')

                # Validate flight ID and class name
                flight_id = int(flight_id)
                if not validate_seat_search_parameters(flight_id, className):
                    raise Exception("Invalid flight ID or class name")

                # Get all reserved seats for a flight
                cursor.execute("SELECT * FROM seat_reservation WHERE ID = %s AND class = %s", (flight_id, className),)
                query_result = cursor.fetchone()

                response = {}

                # Check if flight exists
                if not query_result:
                    raise Exception("404")
                
                # send total number of seats and available seats for class and flight
                className, totalCount, reservedCount, bookedSeats = query_result[1], query_result[2], query_result[3], query_result[4]
                response['className'] = className
                response['totalSeatsCount'] = totalCount
                availableCount = totalCount - reservedCount
                response['availableSeatsCount'] = availableCount
                if availableCount > 0:
                    availableSeats = set(range(1, totalCount + 1)) - set(int(num) for num in bookedSeats.split(',') if num != '')
                    response['availableSeats'] = sorted(list(availableSeats))
                else:
                    response['availableSeats'] = []

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"Flight with ID {flight_id} does not exist")
                print(ex)
                return abort(400, message=f"Failed to get available seats. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")
