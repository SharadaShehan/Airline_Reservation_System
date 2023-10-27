from flask import make_response
from app.utils.db import get_db_connection_guest_user, get_db_connection_registered_user
from flask_restful import Resource, abort, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.validators import validate_guest_id_format


class UserPendingPayments(Resource):
    @jwt_required()     # check if user is jwt authenticated
    def get(self):
        try:
            connection = get_db_connection_registered_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                username = get_jwt_identity()
                
                # SQL query to get user's pending payments
                get_pending_payments_query = """
                    SELECT 
                        bkset.Booking_Ref_ID AS bookingRefID,
                        bkset.Final_Price AS price,
                        shf.Scheduled_ID AS flightID,
                        bprc.Class AS travelClass,
                        bk.Seat_Number AS seat,
                        bk.FirstName AS firstName,
                        bk.LastName AS lastName,
                        bk.IsAdult AS isAdult,
                        bk.Passport_ID AS passportID
                    FROM
                        booked_seat as bk
                        INNER JOIN booking as bkset on bk.Booking = bkset.Booking_Ref_ID
                        INNER JOIN base_price as bprc on bkset.BPrice_Per_Booking = bprc.Price_ID
                        INNER JOIN scheduled_flight as shf on bkset.Scheduled_Flight = shf.Scheduled_ID
                    WHERE
                        bkset.User = %s
                        AND bkset.Completed = 0
                    ORDER BY bkset.Created_At DESC;
                """
                cursor.execute(get_pending_payments_query, (username,))
                result = cursor.fetchall()
                
                # convert result to list of dictionaries
                response = []
                for row in result:
                    for item in response:
                        if item['bookingRefID'] == row[0]:
                            item['passengers'].append({
                                'seatNumber': row[4],
                                'firstName': row[5],
                                'lastName': row[6],
                                'isAdult': row[7],
                                'passportID': row[8]
                            })
                            break
                    else:
                        response.append({
                            'bookingRefID': row[0],
                            'price': row[1],
                            'flightID': row[2],
                            'travelClass': row[3],
                            'passengers': [{
                                'seatNumber': row[4],
                                'firstName': row[5],
                                'lastName': row[6],
                                'isAdult': row[7],
                                'passportID': row[8]
                            }]
                        })
                return make_response(response, 200)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class GuestPendingPayments(Resource):
    def get(self, guest_id):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # validate guest id format
                if not validate_guest_id_format(guest_id):
                    raise Exception("Invalid guest id format")
                
                # SQL query to get user's pending payments
                get_pending_payments_query = """
                    SELECT 
                        bkset.Booking_Ref_ID AS bookingRefID,
                        bkset.Final_Price AS price,
                        shf.Scheduled_ID AS flightID,
                        bprc.Class AS travelClass,
                        bk.Seat_Number AS seat,
                        bk.FirstName AS firstName,
                        bk.LastName AS lastName,
                        bk.IsAdult AS isAdult,
                        bk.Passport_ID AS passportID
                    FROM
                        booked_seat as bk
                        INNER JOIN booking as bkset on bk.Booking = bkset.Booking_Ref_ID
                        INNER JOIN base_price as bprc on bkset.BPrice_Per_Booking = bprc.Price_ID
                        INNER JOIN scheduled_flight as shf on bkset.Scheduled_Flight = shf.Scheduled_ID
                        INNER JOIN guest as gst on bkset.Booking_Ref_ID = gst.Booking_Ref_ID
                    WHERE
                        gst.Guest_ID = %s
                        AND bkset.Completed = 0
                """
                cursor.execute(get_pending_payments_query, (guest_id,))
                result = cursor.fetchall()
                
                # convert result to list of dictionaries
                response = []
                for row in result:
                    for item in response:
                        if item['bookingRefID'] == row[0]:
                            item['passengers'].append({
                                'seatNumber': row[4],
                                'firstName': row[5],
                                'lastName': row[6],
                                'isAdult': row[7],
                                'passportID': row[8]
                            })
                            break
                    else:
                        response.append({
                            'bookingRefID': row[0],
                            'price': row[1],
                            'flightID': row[2],
                            'travelClass': row[3],
                            'passengers': [{
                                'seatNumber': row[4],
                                'firstName': row[5],
                                'lastName': row[6],
                                'isAdult': row[7],
                                'passportID': row[8]
                            }]
                        })
                return make_response(response, 200)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
