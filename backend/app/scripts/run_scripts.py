from flask import current_app, jsonify
from flask_restful import Resource, abort
from app.scripts.create_tables import create_tables, drop_all_tables
from app.scripts.create_views import create_views, drop_all_views
from app.scripts.create_procedures import create_procedures, drop_all_procedures
from app.scripts.create_functions import create_functions, drop_all_functions
from app.scripts.create_events import create_events, drop_all_events
from app.scripts.create_authorization import drop_all_users_roles, create_and_grant_users_roles
from app.scripts.create_triggers import create_triggers, drop_all_triggers
from app.scripts.create_indexing import create_indexes
from app.scripts.populate_data import populate_data

class RunScripts(Resource):
    def get(self):
        try:
            # script runs only if 'INIT_ENABLED' is set to 1
            if current_app.config['INIT_ENABLED'] == 1:
                # resets or setup the database with default data
                drop_all_users_roles()
                drop_all_tables()
                drop_all_views()
                drop_all_procedures()
                drop_all_functions()
                drop_all_events()
                drop_all_triggers()
                create_tables()
                # create_indexes()
                create_views()
                create_procedures()
                create_functions()
                create_events()
                create_triggers()
                create_and_grant_users_roles()
                populate_data()
                return jsonify({'message': "Scripts ran successfully. Database has been setup with default data"})
            return abort(400, message="Scripts didn't to run. Environment hasn't been setup to run scripts")
        except Exception as ex:
            return abort(400, message=f"Scripts failed to run. Error: {ex}")
    
