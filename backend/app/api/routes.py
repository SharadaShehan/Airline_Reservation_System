from flask import Blueprint
from app.api.resources.user_api import UserSimple
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


# define urls for frontend to access data
api.add_resource(UserSimple, '/user/<int:user_id>')

