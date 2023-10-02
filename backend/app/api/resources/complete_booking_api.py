from flask import jsonify, make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_payment

parser = reqparse.RequestParser()
parser.add_argument('transactionID', type=str, required=True)


class CompleteBookingSet(Resource):
    def post(self, bkset_id):
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
                    raise Exception("Incomplete payment data")
                
                transactionID = args['transactionID']
                if not validate_payment(bkset_id, transactionID):
                    raise Exception("Invalid payment data")
                
                cursor.execute(f"SELECT Completed FROM booking_set WHERE Booking_Ref_ID = '{bkset_id}'")
                query_result = cursor.fetchone()
                # Check if booking set exists
                if query_result is None:
                    raise Exception("Booking set does not exist")
                # Check if booking set is already completed
                if query_result[0] == 1:
                    raise Exception("Booking set is already completed")

                # Complete booking set
                cursor.callproc('CompleteBookingSet', (bkset_id,))
                
                connection.commit()
                connection.close()
                return make_response({'message': 'Booking completed successfully'}, 200)
            
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to complete booking. Error: {ex}.")
        else:
            return abort(500, message="Failed to connect to database")
