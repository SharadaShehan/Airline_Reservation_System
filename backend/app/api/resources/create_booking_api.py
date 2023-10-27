from flask import make_response, request
from app.utils.db import get_db_connection_registered_user, get_db_connection_guest_user
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_booking_data, validate_email, validate_contact_number, validate_guest_id_format
from flask_jwt_extended import jwt_required, get_jwt_identity
import time, json

parser = reqparse.RequestParser()
parser.add_argument('flightID', type=int, required=True)
parser.add_argument('travelClass', type=str, required=True)
parser.add_argument('passengers', type=dict, required=True, action='append')
parser.add_argument('email', type=str, required=False)
parser.add_argument('contactNumber', type=str, required=False)
parser.add_argument('guestID', type=str, required=False)

# Throttling parameters
GUEST_REQUESTS_LIMIT = 5  # Number of requests allowed for guest users
USER_REQUESTS_LIMIT = 7  # Number of requests allowed for registered users
TIME_WINDOW = 1800  # Time window in seconds (30 minutes)
request_counts = {}  # Dictionary to store request counts for each client IP address


class GuestCreateBooking(Resource):
    def post(self):
        
        # ------------------------------------- Throttling ------------------------------------------------------------

        client_ip = request.remote_addr  # Get client IP address
        # Initialize request count for new client IP addresses
        if client_ip not in request_counts:
            request_counts[client_ip] = []
        
        current_time = time.time()

        # Remove requests older than the time window for current client IP address
        request_counts[client_ip] = [t for t in request_counts[client_ip] if t > current_time - TIME_WINDOW]

        # Check If the limit is exceeded
        if len(request_counts[client_ip]) >= GUEST_REQUESTS_LIMIT:
            abort(429, message=f"Too many requests. Please wait {round(TIME_WINDOW - (current_time - request_counts[client_ip][0]))} seconds before trying again")
            
        # If the number of requests is within the limit, process the request
        request_counts[client_ip].append(current_time)

        # --------------------------------------------------------------------------------------------------------------

        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                connection.autocommit = False
                cursor = connection.cursor()

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete booking data or invalid JSON object")

                flightID = args['flightID']
                travelClass = args['travelClass']
                passengers = args['passengers']
                bookingCount = len(passengers)
                email = args['email']
                contactNumber = args['contactNumber']
                guestID = args['guestID']

                # Validate booking data
                if not validate_booking_data(flightID, travelClass, passengers):
                    raise Exception("Invalid booking data")
                
                if guestID == None:
                    guestID = '____________'
                elif not validate_guest_id_format(guestID):
                    raise Exception("Invalid guest ID format")
                
                if email == None:
                    email = 'NULL'
                elif not validate_email(email):
                    raise Exception("Invalid email address")
                
                if contactNumber == None:
                    contactNumber = 'NULL'
                elif not validate_contact_number(contactNumber):
                    raise Exception("Invalid contact number")

                passengers_json = json.dumps(passengers)

                # Create booking set
                procedureStatus = 0
                result_args = cursor.callproc('GuestCreateBooking', (flightID, guestID, travelClass, bookingCount, passengers_json, email, contactNumber, 0, 0, 0, 0))
                procedureStatus = result_args[-1]
                guestID = result_args[-2]
                finalPrice = result_args[-3]
                bookingRefID = result_args[-4]

                if procedureStatus == 1:
                    connection.commit()
                    connection.close()
                    return make_response({'message': 'Booking created successfully', 'bookingRefID': bookingRefID, 'price': finalPrice, 'guestID': guestID }, 201)
                else:
                    raise Exception("Invalid booking data")
            except Exception as ex:
                connection.rollback()
                connection.close()
                return abort(400, message=f"Failed to create booking. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")


class UserCreateBooking(Resource):
    @jwt_required()
    def post(self):

        # ------------------------------------- Throttling ------------------------------------------------------------

        client_ip = request.remote_addr  # Get client IP address
        # Initialize request count for new client IP addresses
        if client_ip not in request_counts:
            request_counts[client_ip] = []

        current_time = time.time()

        # Remove requests older than the time window for current client IP address
        request_counts[client_ip] = [t for t in request_counts[client_ip] if t > current_time - TIME_WINDOW]

        # Check If the limit is exceeded
        if len(request_counts[client_ip]) >= USER_REQUESTS_LIMIT:
            abort(429, message=f"Too many requests. Please wait {round((TIME_WINDOW - (current_time - request_counts[client_ip][0]))/60)} minutes before trying again")
            
        # If the number of requests is within the limit, process the request
        request_counts[client_ip].append(current_time)

        # --------------------------------------------------------------------------------------------------------------

        try:
            connection = get_db_connection_registered_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                connection.autocommit = False
                cursor = connection.cursor()

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete booking data")
                
                flightID = args['flightID']
                travelClass = args['travelClass']
                passengers = args['passengers']
                bookingCount = len(passengers)
                username = get_jwt_identity()

                # Validate booking data
                if not validate_booking_data(flightID, travelClass, passengers):
                    raise Exception("Invalid booking data")

                passengers_json = json.dumps(passengers)

                # Create booking set
                procedureStatus = 0
                result_args = cursor.callproc('UserCreateBooking', (flightID, username, travelClass, bookingCount, passengers_json, 0, 0, 0))
                procedureStatus = result_args[-1]
                finalPrice = result_args[-2]
                bookingRefID = result_args[-3]
                
                if procedureStatus == 1:
                    connection.commit()
                    connection.close()
                    return make_response({'message': 'Booking created successfully', 'bookingRefID': bookingRefID, 'price': finalPrice}, 201)
                else:
                    raise Exception("Invalid booking data")
            except Exception as ex:
                connection.rollback()
                connection.close()
                return abort(400, message=f"Failed to create booking. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")



