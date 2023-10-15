from flask import make_response
from app.utils.db import get_db_connection_staff
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_model_data
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True)
parser.add_argument('seatsCount', type=dict, required=True)


class CreateModel(Resource):
    @jwt_required()
    def post(self):

        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                connection.autocommit = False
                cursor = connection.cursor()

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete model data or invalid JSON object")
                
                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Data Entry Operator'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                model_name = request_data['name']
                seats_count = request_data['seatsCount']

                # Validate model data
                if not validate_model_data(model_name, seats_count):
                    raise Exception("Invalid model data")

                seats_count_json = json.dumps(seats_count)

                # Create model
                procedureStatus = 0
                result_args = cursor.callproc('CreateModel', (model_name, seats_count_json, 0))
                procedureStatus = result_args[-1]

                if procedureStatus == 1:
                    connection.commit()
                    connection.close()
                else:
                    raise Exception("Invalid model data")

                return make_response({'message': 'Model and capacity records created successfully'}, 201)
            
            except Exception as ex:
                connection.rollback()
                connection.close()
                if str(ex) == "403":
                    return abort(403, message="Only data entry operators can create models")
                return abort(400, message=f"Failed to create model. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
