from flask import current_app, jsonify
from flask_restful import Resource, abort
from app.scripts.create_tables import create_tables, drop_all_tables
from app.scripts.populate_data import populate_data


class RunScripts(Resource):
    def get(self):
        try:
            # script runs only if 'INIT_ENABLED' is set to 1
            if current_app.config['INIT_ENABLED'] == 1:
                # resets or setup the database with default data
                drop_all_tables()
                create_tables()
                populate_data()
                return jsonify({'message': "Scripts ran successfully. Database has been setup with default data"})
            return abort(400, message="Scripts didn't to run. Environment hasn't been setup to run scripts")
        except Exception as ex:
            return abort(400, message=f"Scripts failed to run. Error: {ex}")
    
