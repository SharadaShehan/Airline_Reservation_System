from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity


class UserPendingPayments(Resource):
    @jwt_required()     # check if user is jwt authenticated
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                username = get_jwt_identity()
                
                # SQL query to get user's pending payments
                get_pending_payments_query = f"""
                    SELECT 
                        bkset.Booking_Ref_ID AS bookingRefID,
                        bkset.Final_Price AS price,
                        shf.Scheduled_ID AS flightID,
                        bprc.Class AS travelClass,
                        bk.Seat_Number AS seat,
                        bk.FirstName AS firstName,
                        bk.LastName AS lastName,
                        bk.IsAdult AS isAdult
                    FROM
                        booking as bk
                        INNER JOIN booking_set as bkset on bk.Booking_Set = bkset.Booking_Ref_ID
                        INNER JOIN base_price as bprc on bkset.BPrice_Per_Booking = bprc.Price_ID
                        INNER JOIN scheduled_flight as shf on bkset.Scheduled_Flight = shf.Scheduled_ID
                    WHERE
                        bkset.User = '{username}'
                        AND bkset.Completed = 0
                    ORDER BY bkset.Created_At DESC;
                """
                cursor.execute(get_pending_payments_query)
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
                                'isAdult': row[7]
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
                                'isAdult': row[7]
                            }]
                        })
                return make_response(response, 200)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")

