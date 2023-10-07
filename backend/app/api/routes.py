from flask import Blueprint
from app.api.resources.user_api import GetAuthToken, GetUserDetails
from app.api.resources.create_booking_api import GuestCreateBooking, UserCreateBooking
from app.api.resources.complete_booking_api import CompleteBookingSet
from app.api.resources.cancel_booking_api import GuestCancelBookingSet, UserCancelBookingSet
from app.api.resources.get_reserved_seats_api import GetReservedSeats
from app.api.resources.search_api import SearchFlights
from app.api.resources.register_user_api import RegisterUser
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


# urls for frontend to access data
api.add_resource(RegisterUser, '/user/register')    # POST method to register user
api.add_resource(SearchFlights, '/flight/search')    # GET method to search flights
api.add_resource(GetReservedSeats, '/flight/<int:flight_id>/seats')    # GET method to get available seats
api.add_resource(UserCancelBookingSet, '/booking/cancel/user/<bkset_id>')    # DELETE method to cancel booking
api.add_resource(GuestCancelBookingSet, '/booking/cancel/guest/<bkset_id>')    # DELETE method to cancel booking
api.add_resource(CompleteBookingSet, '/booking/complete/<bkset_id>')    # POST method to complete booking
api.add_resource(UserCreateBooking, '/booking/create/user')    # POST method to create booking
api.add_resource(GuestCreateBooking, '/booking/create/guest')    # POST method to create booking
api.add_resource(GetUserDetails, '/user/details')   # GET method to get user details
api.add_resource(GetAuthToken, '/user/auth')    # POST method to get JWT token



