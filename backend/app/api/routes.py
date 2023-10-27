from flask import Blueprint
from app.api.resources.user_api import UserGetAuthToken, GetUserDetails
from app.api.resources.user_update_profile_api import UpdateUser
from app.api.resources.register_user_api import RegisterUser
from app.api.resources.deo_api import DEOGetAuthToken, GetDEODetails
from app.api.resources.admin_api import AdminGetAuthToken, GetAdminDetails
from app.api.resources.deo_update_profile import UpdateDEO
from app.api.resources.admin_update_profile import UpdateAdmin
from app.api.resources.register_deo_api import RegisterDEO
from app.api.resources.register_admin_api import RegisterAdmin
from app.api.resources.pending_payments_api import UserPendingPayments, GuestPendingPayments
from app.api.resources.create_booking_api import GuestCreateBooking, UserCreateBooking
from app.api.resources.complete_booking_api import CompleteBooking
from app.api.resources.cancel_booking_api import GuestCancelBooking, UserCancelBooking
from app.api.resources.get_available_seats_api import GetAvailableSeats
from app.api.resources.search_api import SearchFlights
from app.api.resources.admin_delete_api import AdminDeleteModel, AdminDeleteRoute, AdminDeleteAirport, AdminDeleteAirplane, AdminDeleteScheduledFlight, AdminHideScheduledFlight
from app.api.resources.admin_view_reports import GetRevenueByModel
from app.api.resources.admin_search_api import GetPassengersByNextFlight, GetPassengersByDateDestination, GetBookingCountByDatePassengerType, GetPastFlightsDetails, GetPassengersByRouteID
from app.api.resources.search_api import SearchBookedTickets,SearchUserBookedTickets, SearchGuestBookedTickets
from app.api.resources.get_all_api import GetAllAirplanes, GetAllAirports, GetAllRoutes, GetAllModels
from app.api.resources.deo_get_all_api import DEOGetAllModels, DEOGetAllRoutes, DEOGetAllAirplanes, DEOGetAllAirports
from app.api.resources.deo_schedule_flight_api import DEOScheduleFlight
from app.api.resources.deo_create_model_api import CreateModel
from app.api.resources.deo_create_airport_api import CreateAirport
from app.api.resources.deo_create_airplane_api import CreateAirplane
from app.api.resources.deo_create_route_api import CreateRoute
from app.api.resources.deo_update_delay_api import DEOupdateDelay
from app.api.resources.get_flight_details_api import GetFlightByID
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


# urls for frontend to manipulate data

api.add_resource(CreateRoute, '/deo/create/route')    # POST method to create route
api.add_resource(CreateAirplane, '/deo/create/airplane')    # POST method to create airplane
api.add_resource(CreateAirport, '/deo/create/airport')    # POST method to create airport
api.add_resource(CreateModel, '/deo/create/model')    # POST method to create model
api.add_resource(DEOScheduleFlight, '/deo/schedule-flight')    # POST method to schedule flight
api.add_resource(DEOupdateDelay,'/deo/update/delay')    # PATCH method to update delay
api.add_resource(UpdateDEO, '/deo/update/account')    # PATCH method to update deo
api.add_resource(GetDEODetails, '/deo/details/account')    # GET method to get deo details
api.add_resource(DEOGetAuthToken, '/deo/auth')    # POST method to get JWT token
api.add_resource(DEOGetAllAirports, '/deo/get/airports')    # GET method to get all airports
api.add_resource(DEOGetAllAirplanes, '/deo/get/airplanes')    # GET method to get all airplanes
api.add_resource(DEOGetAllRoutes, '/deo/get/routes')    # GET method to get all routes
api.add_resource(DEOGetAllModels, '/deo/get/models')    # GET method to get all models

api.add_resource(AdminHideScheduledFlight, '/admin/hide/scheduled-flight/<flight_id>')    # PATCH method to hide scheduled flight
api.add_resource(AdminDeleteScheduledFlight, '/admin/delete/scheduled-flight/<flight_id>')    # DELETE method to delete scheduled flight
api.add_resource(AdminDeleteAirplane, '/admin/delete/airplane/<tail_number>')    # DELETE method to delete airplane
api.add_resource(AdminDeleteAirport, '/admin/delete/airport/<icao_code>')    # DELETE method to delete airport
api.add_resource(AdminDeleteRoute, '/admin/delete/route/<route_id>')    # DELETE method to delete route
api.add_resource(AdminDeleteModel, '/admin/delete/model/<model_id>')    # DELETE method to delete model
api.add_resource(GetPastFlightsDetails, '/admin/past-flights')    # GET method to get past flights details
api.add_resource(GetBookingCountByDatePassengerType, '/admin/bookings-by-ptype')    # GET method to get booking count by date and passenger type
api.add_resource(GetPassengersByDateDestination, '/admin/passengers-to-destination')    # GET method to get passengers by date and destination
api.add_resource(GetPassengersByRouteID, '/admin/next-flight-by-id/<route_id>/passengers')    # GET method to get passengers by route id
api.add_resource(GetPassengersByNextFlight, '/admin/next-flight/passengers')    # GET method to get passengers by flight
api.add_resource(GetRevenueByModel, '/admin/revenue-by-model')    # GET method to get revenue by model
api.add_resource(UpdateAdmin, '/admin/update/account')    # PATCH method to update admin
api.add_resource(RegisterDEO, '/deo/register')    # POST method to register deo
api.add_resource(RegisterAdmin, '/admin/register')    # POST method to register admin
api.add_resource(GetAdminDetails, '/admin/details/account')    # GET method to get admin details
api.add_resource(AdminGetAuthToken, '/admin/auth')    # POST method to get JWT token

api.add_resource(SearchUserBookedTickets,'/tickets/user/search') # GET method to search booked tickets of user
api.add_resource(UserCancelBooking, '/booking/cancel/user/<bkset_id>')    # DELETE method to cancel booking
api.add_resource(UserPendingPayments, '/user/pending-payments')    # GET method to get user's pending payments
api.add_resource(UserCreateBooking, '/booking/create/user')    # POST method to create booking
api.add_resource(UpdateUser, '/user/update/account')    # PATCH method to update user
api.add_resource(RegisterUser, '/user/register')    # POST method to register user
api.add_resource(GetUserDetails, '/user/details/account')   # GET method to get user details
api.add_resource(UserGetAuthToken, '/user/auth')    # POST method to get JWT token

api.add_resource(SearchGuestBookedTickets,'/tickets/guest/search') # GET method to search booked tickets of guest
api.add_resource(SearchBookedTickets, '/tickets/guest/search-by-ref-id')    # GET method to search bookings
api.add_resource(CompleteBooking, '/booking/complete/<bkset_id>')    # POST method to complete booking
api.add_resource(GuestCancelBooking, '/booking/cancel/guest/<bkset_id>/<guest_id>')    # DELETE method to cancel booking
api.add_resource(GuestPendingPayments, '/guest/pending-payments/<guest_id>')    # GET method to get guest's pending payments
api.add_resource(GuestCreateBooking, '/booking/create/guest')    # POST method to create booking
api.add_resource(GetAvailableSeats, '/flight/<int:flight_id>/seats')    # GET method to get available seats
api.add_resource(SearchFlights, '/flight/search')    # GET method to search flights
api.add_resource(GetFlightByID, '/flight/<int:flight_id>')    # GET method to get flight details

api.add_resource(GetAllModels, '/get/models')    # GET method to get all models
api.add_resource(GetAllRoutes, '/get/routes')    # GET method to get all routes
api.add_resource(GetAllAirports, '/get/airports')    # GET method to get all airports
api.add_resource(GetAllAirplanes, '/get/airplanes')    # GET method to get all airplanes


