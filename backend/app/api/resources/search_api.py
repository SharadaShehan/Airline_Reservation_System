from flask import make_response, request
from app.utils.db import get_db_connection_guest_user, get_db_connection_registered_user
from flask_restful import Resource, abort
from app.utils.validators import validate_search_parameters, validate_booking_set_id_format, validate_user_data
from flask_jwt_extended import jwt_required, get_jwt_identity


class SearchFlights(Resource):
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                from_airport = request.args.get('fromAirport')
                to_airport = request.args.get('toAirport')
                date = request.args.get('date')

                # Validate search parameters
                if not validate_search_parameters(from_airport, to_airport, date):
                    raise Exception("Invalid search parameters")
                
                # Get all flights for given parameters
                cursor.execute("""SELECT 
                               ID, originIATA, originAddress, departureDateAndTime, destinationIATA, destinationAddress, arrivalDateAndTime, durationMinutes, airplaneModel
                               FROM flight WHERE originICAO = %s AND destinationICAO = %s AND DATE(departureDateAndTime) = %s;""", (from_airport, to_airport, date))
                query_result = cursor.fetchall()

                # Check if no flights found
                if query_result == []:
                    raise Exception("404")
                
                response = []

                for item in query_result:
                    response.append({
                        "flightID": item[0],
                        "origin" : {
                            "IATA": item[1],
                            "address": item[2],
                            "dateAndTime": item[3]
                        },
                        "destination": {
                            "IATA": item[4],
                            "address": item[5],
                            "dateAndTime": item[6]
                        },
                        "durationMinutes": item[7],
                        "airplaneModel": item[8]
                    })

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"No Flight found for given parameters")
                print(ex)
                return abort(400, message=f"Failed to get flights. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")
        

class SearchBookedTickets(Resource):
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                bookingRefID = request.args.get('bookingRefID')

                # Validate search parameters
                if not validate_booking_set_id_format(bookingRefID):
                    raise Exception("Invalid search parameters")
                
                # Get all tickets with given bookingRefID
                cursor.execute("""
                    SELECT 
                        ticketNumber,
                        passenger,
                        flight,
                        seat,
                        fromIATA,
                        fromCity,
                        toIATA,
                        toCity,
                        departureDate,
                        departureTime,
                        class,
                        passportID,
                        status
                    from ticket
                    WHERE bookingRefID = %s;
                """, (bookingRefID,))
                query_result = cursor.fetchall()

                # Check if no tickets found
                if query_result == []:
                    raise Exception("404")
                
                response = []

                for item in query_result:
                    response.append({
                        "ticketNumber": item[0],
                        "passenger": item[1],
                        "flight": item[2],
                        "seat": item[3],
                        "from": {
                            "city": item[5],
                            "IATA": item[4]
                        },
                        "to": {
                            "city": item[7],
                            "IATA": item[6]
                        },
                        "departureDate": item[8],
                        "departureTime": item[9],
                        "class": item[10],
                        "passportID": item[11],
                        "status": item[12]
                    })

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"Invalid Booking Ref ID")
                print(ex)
                return abort(400, message=f"Failed to get Booked Tickets. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access") 



class SearchUserBookedTickets(Resource):
    @jwt_required()  
    def get(self):
        try:
            connection = get_db_connection_registered_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                Username= get_jwt_identity()
                
                # Get all tickets with given username
                cursor.execute("""
                    SELECT 
                        ticketNumber, 
                        passenger,
                        flight,
                        seat,
                        fromIATA,
                        fromCity,
                        toIATA,
                        toCity,
                        departureDate,
                        departureTime,
                        class,
                        passportID,
                        status
                    from ticket
                    WHERE bookedUser = %s;
                """, (Username,))
                query_result = cursor.fetchall()

                # Check if no tickets found
                if query_result == []:
                    raise Exception("404")
                
                response = []

                for item in query_result:
                    response.append({
                        "ticketNumber": item[0],
                        "passenger": item[1],
                        "flight": item[2],
                        "seat": item[3],
                        "from": {
                            "city": item[5],
                            "IATA": item[4]
                        },
                        "to": {
                            "city": item[7],
                            "IATA": item[6]
                        },
                        "departureDate": item[8],
                        "departureTime": item[9],
                        "class": item[10],
                        "passportID": item[11],
                        "status": item[12]
                    })

                connection.close()
                return make_response(response, 200)
            
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"User does not have any valid tickets")
                return abort(400, message=f"Failed to get Booked Tickets. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")


class SearchGuestBookedTickets(Resource):
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                guestID = request.args.get('guestID')
                
                # Get all tickets with given bookingRefID
                cursor.execute("""
                    SELECT 
                        ticketNumber, 
                        passenger,
                        flight,
                        seat,
                        fromIATA,
                        fromCity,
                        toIATA,
                        toCity,
                        departureDate,
                        departureTime,
                        class,
                        passportID,
                        status
                    FROM ticket
                    INNER JOIN guest ON ticket.bookingRefID = guest.Booking_Ref_ID
                    WHERE guest.Guest_ID = %s;
                """, (guestID,))
                query_result = cursor.fetchall()

                # Check if no tickets found
                if query_result == []:
                    raise Exception("404")
                
                response = []

                for item in query_result:
                    response.append({
                        "ticketNumber": item[0],
                        "passenger": item[1],
                        "flight": item[2],
                        "seat": item[3],
                        "from": {
                            "city": item[5],
                            "IATA": item[4]
                        },
                        "to": {
                            "city": item[7],
                            "IATA": item[6]
                        },
                        "departureDate": item[8],
                        "departureTime": item[9],
                        "class": item[10],
                        "passportID": item[11],
                        "status": item[12]
                    })

                connection.close()
                return make_response(response, 200)
            
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"Invalid Guest ID")
                return abort(400, message=f"Failed to get Booked Tickets. Error: {ex}.")
        else:
            return abort(403, message="Unauthorized Access")