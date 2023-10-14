from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort
from app.utils.validators import validate_booking_set_id_format
from flask_jwt_extended import jwt_required, get_jwt_identity


class GuestCancelBookingSet(Resource):
    def delete(self, bkset_id):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                # Check if booking set ID is in correct format
                if not validate_booking_set_id_format(bkset_id):
                    raise Exception("Invalid booking set ID")
                
                cursor.execute(f"SELECT User, Completed FROM booking_set WHERE Booking_Ref_ID = '{bkset_id}'")
                query_result = cursor.fetchone()
                # Check if booking set exists
                if query_result is None:
                    raise Exception("404")
                # Check if booking set belongs to a registered user
                if query_result[0] is not None:
                    raise Exception("Unauthorized to cancel booking set")
                # Check if booking set is already completed
                if query_result[1] == 1:
                    raise Exception("Completed booking set cannot be cancelled")
                
                # Complete booking set
                cursor.execute(f"DELETE FROM booking_set WHERE Booking_Ref_ID = '{bkset_id}'")
                
                connection.commit()
                connection.close()
                return make_response({"message": "Booking set cancelled successfully"}, 204)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message="Booking set does not exist")
                print(ex)
                return abort(400, message=f"Failed to cancel booking set. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")


class UserCancelBookingSet(Resource):
    @jwt_required()
    def delete(self, bkset_id):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                # Check if booking set ID is in correct format
                if not validate_booking_set_id_format(bkset_id):
                    raise Exception("Invalid booking set ID")

                cursor.execute(f"SELECT User, Completed FROM booking_set WHERE Booking_Ref_ID = '{bkset_id}'")
                query_result = cursor.fetchone()
                # Check if booking set exists
                if query_result is None:
                    raise Exception("404")
                # Check if booking set belongs to a registered user
                if query_result[0] is None or query_result[0] != get_jwt_identity():
                    raise Exception("Unauthorized to cancel booking set")
                # Check if booking set is already completed
                if query_result[1] == 1:
                    raise Exception("Completed booking set cannot be cancelled")
                
                # Complete booking set
                cursor.execute(f"DELETE FROM booking_set WHERE Booking_Ref_ID = '{bkset_id}'")
                
                connection.commit()
                connection.close()
                return make_response({"message": "Booking set cancelled successfully"}, 204)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message="Booking set does not exist")
                print(ex)
                return abort(400, message=f"Failed to cancel booking set. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")
