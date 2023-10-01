from flask import jsonify, make_response, request
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_search_parameters, validate_booking_set_id_format,validate_user_data
from flask_jwt_extended import jwt_required, get_jwt_identity


class SearchFlights(Resource):
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()
                from_airport = request.args.get('fromAirport')
                to_airport = request.args.get('toAirport')
                date = request.args.get('date')

                # Validate search parameters
                if not validate_search_parameters(from_airport, to_airport, date):
                    raise Exception("Invalid search parameters")
                
                # Get all flights for given parameters
                cursor.execute(f"""SELECT 
                               ID, originIATA, originAddress, departureDateAndTime, destinationIATA, destinationAddress, arrivalDateAndTime, durationMinutes, airplaneModel
                               FROM flight WHERE originICAO = '{from_airport}' AND destinationICAO = '{to_airport}' AND DATE(departureDateAndTime) = '{date}'""")
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
                return abort(400, message=f"Failed to get reserved seats. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")
        

class SearchBookedTickets(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()

                bookingRefID = request.args.get('bookingRefID')

                # Validate search parameters
                if not validate_booking_set_id_format(bookingRefID):
                    raise Exception("Invalid search parameters")
                
                # Get all tickets with given bookingRefID
                cursor.execute(f"""
                    SELECT 
                        ticketNumber, passenger, flight, seat,
                        fromIATA, fromCity, toIATA, toCity,
                        departureDate, departureTime,
                        class
                    from ticket
                    WHERE bookingRefID = '{bookingRefID}';
                """)
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
                        "class": item[10]
                    })

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"Invalid Booking Ref ID")
                print(ex)
                return abort(400, message=f"Failed to get Booked Tickets. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")  



class SearchUserBookedTickets(Resource):
    @jwt_required()  
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()
                Username= get_jwt_identity()

                # Validate search parameters
                if not validate_user_data(Username):
                    raise Exception("Invalid search parameters")
                
                # Get all tickets with given username
                cursor.execute(f"""
                    SELECT 
                        ticketNumber, passenger, flight, seat,
                        fromIATA, fromCity, toIATA, toCity,
                        departureDate, departureTime,
                        class
                    from ticket
                    WHERE bookedUser = '{Username}';
                """)
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
                        "class": item[10]
                    })

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message=f"Invalid Booking Ref ID")
                print(ex)
                return abort(400, message=f"Failed to get Booked Tickets. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")  