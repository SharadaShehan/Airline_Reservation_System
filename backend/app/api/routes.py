from flask import Blueprint
from app.api.resources.user_api import GetAuthToken, GetUserDetails
from app.api.resources.create_booking_api import GuestCreateBooking, UserCreateBooking
from app.api.resources.complete_booking_api import CompleteBookingSet
from app.api.resources.cancel_booking_api import GuestCancelBookingSet, UserCancelBookingSet
from app.api.resources.get_available_seats_api import GetAvailableSeats
from app.api.resources.search_api import SearchFlights
from app.api.resources.admin_view_reports import GetRevenueByModel
from app.api.resources.admin_search_api import GetPassengersByNextFlight, GetPassengersByDateDestination, GetBookingCountByDatePassengerType, GetPastFlightsDetails
from app.api.resources.search_api import SearchBookedTickets
from app.api.resources.register_user_api import RegisterUser
from app.api.resources.get_all_api import GetmodelDetails,Getallroutes,Getallairports,Getallairplanes
from app.api.resources.deo_schedule_flight_api import DEOScheduleFlight
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


# urls for frontend to access data
api.add_resource(DEOScheduleFlight, '/deo/schedule-flight')    # POST method to schedule flight
api.add_resource(SearchBookedTickets, '/tickets/search')    # GET method to search bookings
api.add_resource(GetPastFlightsDetails, '/admin/past-flights')    # GET method to get past flights details
api.add_resource(GetBookingCountByDatePassengerType, '/admin/bookings-by-ptype')    # GET method to get booking count by date and passenger type
api.add_resource(GetPassengersByDateDestination, '/admin/passengers-to-destination')    # GET method to get passengers by date and destination
api.add_resource(GetPassengersByNextFlight, '/admin/next-flight/passengers')    # GET method to get passengers by flight
api.add_resource(GetRevenueByModel, '/admin/revenue-by-model')    # GET method to get revenue by model
api.add_resource(RegisterUser, '/user/register')    # POST method to register user
api.add_resource(SearchFlights, '/flight/search')    # GET method to search flights
api.add_resource(GetAvailableSeats, '/flight/<int:flight_id>/seats')    # GET method to get available seats
api.add_resource(UserCancelBookingSet, '/booking/cancel/user/<bkset_id>')    # DELETE method to cancel booking
api.add_resource(GuestCancelBookingSet, '/booking/cancel/guest/<bkset_id>')    # DELETE method to cancel booking
api.add_resource(CompleteBookingSet, '/booking/complete/<bkset_id>')    # POST method to complete booking
api.add_resource(UserCreateBooking, '/booking/create/user')    # POST method to create booking
api.add_resource(GuestCreateBooking, '/booking/create/guest')    # POST method to create booking
api.add_resource(GetmodelDetails,'/get-all/models')
api.add_resource(Getallroutes,'/get-all/routes')
api.add_resource(Getallairports,'/get-all/airports')
api.add_resource(Getallairplanes,'/get-all/airplanes')
api.add_resource(GetUserDetails, '/user/details')   # GET method to get user details
api.add_resource(GetAuthToken, '/user/auth')    # POST method to get JWT token


