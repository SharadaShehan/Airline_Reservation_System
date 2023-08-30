from flask import Blueprint
from app.scripts.run_scripts import RunScripts
from flask_restful import Api

api_bp_init = Blueprint('scripts', __name__)
api = Api(api_bp_init)

api.add_resource(RunScripts, '')

