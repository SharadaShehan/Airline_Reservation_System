from flask import Blueprint
from app.api.resources.user_api import GetAuthToken, GetUserDetails
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


# urls for frontend to access data
api.add_resource(GetUserDetails, '/user/details')   # GET method to get user details
api.add_resource(GetAuthToken, '/user/auth')    # POST method to get JWT token

# api.add_resource(UserSimple, '/user/<int:user_id>')

