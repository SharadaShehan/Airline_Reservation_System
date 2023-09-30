from flask import jsonify, make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_booking_data
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('flightID', type=int, required=True)
parser.add_argument('travelClass', type=str, required=True)
parser.add_argument('passengers', type=dict, required=True, action='append')


class GuestCreateBooking(Resource):
    def post(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                try:
                    args = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete booking data")

                flightID = args['flightID']
                travelClass = args['travelClass']
                passengers = args['passengers']
                bookingCount = len(passengers)

                # Validate booking data
                if not validate_booking_data(flightID, travelClass, passengers):
                    raise Exception("Invalid booking data")
                
                # Generate an unique booking reference ID
                cursor.execute(f"SELECT GenerateRandomString()")
                bookingRefID = cursor.fetchone()[0]

                # Calculate final price
                cursor.execute(f"SELECT CalculateFinalPrice({flightID}, 'NULL', '{travelClass}', {bookingCount})")
                finalPrice = cursor.fetchone()[0]
                
                # Create temporary table to store passengers booking data
                delete_temp_booking_table_query = """DROP TEMPORARY TABLE IF EXISTS booking_data;"""
                cursor.execute(delete_temp_booking_table_query)
                create_temp_booking_table_query = """
                    CREATE TEMPORARY TABLE IF NOT EXISTS booking_data (
                        SeatNumber SMALLINT,
                        FirstName VARCHAR(30),
                        LastName VARCHAR(30),
                        IsAdult BOOLEAN ) ;
                """
                cursor.execute(create_temp_booking_table_query)

                # Insert passengers booking data into temporary table
                insert_temp_booking_table_query = """INSERT INTO booking_data (SeatNumber, FirstName, LastName, IsAdult) VALUES"""
                for passenger in passengers:
                    insert_temp_booking_table_query += f"({passenger['seatNumber']}, '{passenger['firstName']}', '{passenger['lastName']}', {passenger['isAdult']}),"
                insert_temp_booking_table_query = insert_temp_booking_table_query[:-1] + ";"
                cursor.execute(insert_temp_booking_table_query)

                # Create booking set
                procedureStatus = 0
                result_args = cursor.callproc('CreateBookingSet', (bookingRefID, flightID, 'NULL', travelClass, bookingCount, finalPrice, 0))
                procedureStatus = result_args[-1]
                
                connection.commit()
                connection.close()

                if procedureStatus == 1:
                    return make_response({'message': 'Booking created successfully', 'bookingRefID': bookingRefID, 'price': finalPrice}, 201)
                else:
                    raise Exception("Invalid booking data")
            except Exception as ex:
                try :
                    cursor = connection.cursor()
                    # Delete booking set if booking process failed (but booking set was created)
                    cursor.execute(f"DELETE FROM Booking_Set WHERE Booking_Ref_ID = '{bookingRefID}'")
                    connection.commit()
                    connection.close()
                except Exception: pass
                return abort(400, message=f"Failed to create booking. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")


class UserCreateBooking(Resource):
    @jwt_required()
    def post(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
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
                
                # Generate an unique booking reference ID
                cursor.execute(f"SELECT GenerateRandomString()")
                bookingRefID = cursor.fetchone()[0]

                # Calculate final price
                cursor.execute(f"SELECT CalculateFinalPrice({flightID}, '{username}', '{travelClass}', {bookingCount})")
                finalPrice = cursor.fetchone()[0]
                
                # Create temporary table to store passengers booking data
                delete_temp_booking_table_query = """DROP TEMPORARY TABLE IF EXISTS booking_data;"""
                cursor.execute(delete_temp_booking_table_query)
                create_temp_booking_table_query = """
                    CREATE TEMPORARY TABLE IF NOT EXISTS booking_data (
                        SeatNumber SMALLINT,
                        FirstName VARCHAR(30),
                        LastName VARCHAR(30),
                        IsAdult BOOLEAN ) ;
                """
                cursor.execute(create_temp_booking_table_query)

                # Insert passengers booking data into temporary table
                insert_temp_booking_table_query = """INSERT INTO booking_data (SeatNumber, FirstName, LastName, IsAdult) VALUES"""
                for passenger in passengers:
                    insert_temp_booking_table_query += f"({passenger['seatNumber']}, '{passenger['firstName']}', '{passenger['lastName']}', {passenger['isAdult']}),"
                insert_temp_booking_table_query = insert_temp_booking_table_query[:-1] + ";"
                cursor.execute(insert_temp_booking_table_query)

                # Create booking set
                procedureStatus = 0
                result_args = cursor.callproc('CreateBookingSet', (bookingRefID, flightID, username, travelClass, bookingCount, finalPrice, 0))
                procedureStatus = result_args[-1]
                
                if procedureStatus == 1:
                    connection.commit()
                    connection.close()
                    return make_response({'message': 'Booking created successfully', 'bookingRefID': bookingRefID, 'price': finalPrice}, 201)
                else:
                    raise Exception("Invalid booking data")
            except Exception as ex:
                try :
                    cursor = connection.cursor()
                    # Delete booking set if booking process failed (but booking set was created)
                    cursor.execute(f"DELETE FROM Booking_Set WHERE Booking_Ref_ID = '{bookingRefID}'")
                    connection.commit()
                    connection.close()
                except Exception: pass
                return abort(400, message=f"Failed to create booking. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")



