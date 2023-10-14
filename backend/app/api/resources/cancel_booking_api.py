from flask import make_response
from app.utils.db import get_db_connection_registered_user, get_db_connection_guest_user
from flask_restful import Resource, abort
from app.utils.validators import validate_booking_set_id_format, validate_guest_id_format
from flask_jwt_extended import jwt_required, get_jwt_identity


class GuestCancelBooking(Resource):
    def delete(self, bkset_id, guest_id):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                # Check if booking ID and guest ID are in correct format
                if not validate_booking_set_id_format(bkset_id) or not validate_guest_id_format(guest_id):
                    raise Exception("Invalid booking ID or guest ID")
                
                cursor.execute("""
                    SELECT 
                        bkset.User, bkset.Completed
                    FROM 
                        booking as bkset
                        INNER JOIN guest as gst ON bkset.Booking_Ref_ID = gst.Booking_Ref_ID
                    WHERE
                        bkset.Booking_Ref_ID = %s AND gst.Guest_ID = %s           
                """, (bkset_id, guest_id))

                query_result = cursor.fetchone()
                # Check if booking exists
                if query_result is None:
                    raise Exception("404")
                # Check if booking belongs to a registered user
                if query_result[0] is not None:
                    raise Exception("Unauthorized to cancel booking")
                # Check if booking is already completed
                if query_result[1] == 1:
                    raise Exception("Completed booking cannot be cancelled")
                
                # delete booking
                cursor.execute("DELETE FROM booking WHERE Booking_Ref_ID = %s", (bkset_id,))
                
                connection.commit()
                connection.close()
                return make_response({"message": "Booking cancelled successfully"}, 204)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message="Booking does not exist")
                print(ex)
                return abort(400, message=f"Failed to cancel booking. Error: {ex}")
        else:
            return abort(403, message="Unauthozrzed access")


class UserCancelBooking(Resource):
    @jwt_required()
    def delete(self, bkset_id):
        try:
            connection = get_db_connection_registered_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                # Check if booking ID is in correct format
                if not validate_booking_set_id_format(bkset_id):
                    raise Exception("Invalid booking ID")

                cursor.execute("SELECT User, Completed FROM booking WHERE Booking_Ref_ID = %s", (bkset_id,))
                query_result = cursor.fetchone()
                # Check if booking exists
                if query_result is None:
                    raise Exception("404")
                # Check if booking belongs to a registered user
                if query_result[0] is None or query_result[0] != get_jwt_identity():
                    raise Exception("Unauthorized to cancel booking")
                # Check if booking is already completed
                if query_result[1] == 1:
                    raise Exception("Completed booking cannot be cancelled")
                
                # Complete booking
                cursor.execute("DELETE FROM booking WHERE Booking_Ref_ID = %s", (bkset_id,))
                
                connection.commit()
                connection.close()
                return make_response({"message": "Booking cancelled successfully"}, 204)
            except Exception as ex:
                if str(ex) == "404":
                    return abort(404, message="Booking does not exist")
                print(ex)
                return abort(400, message=f"Failed to cancel booking. Error: {ex}")
        else:
            return abort(403, message="Unauthozrzed access")
