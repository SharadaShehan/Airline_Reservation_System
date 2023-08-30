from flask import current_app, jsonify
from flask_restful import Resource
from .create_tables import create_tables, drop_all_tables
from .populate_data import populate_data


class RunScripts(Resource):
    def get(self):
        try:
            if current_app.config['INIT_ENABLED'] == 1:
                drop_all_tables()
                create_tables()
                populate_data()
                return jsonify({'message': "Scripts run successfully"})
            return jsonify({'message': "Scripts failed to run"})
        except Exception as ex:
            print("error: ", ex)
            return jsonify({"message": "Scripts failed to run", "Error": f"{ex}"})
    
