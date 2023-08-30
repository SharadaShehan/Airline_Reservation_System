from flask import Blueprint
from app.api.resources.user_api import UserSimple
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


api.add_resource(UserSimple, '/user/<int:user_id>')

