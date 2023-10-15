from flask import make_response
from app.utils.db import get_db_connection_staff
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_route_data
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

parser = reqparse.RequestParser()
parser.add_argument('origin', type=str, required=True)
parser.add_argument('destination', type=str, required=True)
parser.add_argument('durationMinutes', type=int, required=True)
parser.add_argument('basePrice', type=dict, required=True)


class CreateRoute(Resource):
    @jwt_required()
    def post(self):
        
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(403, message=f"Failed to connect to the database. Error: {ex}")
        
        if connection:
            try:
                connection.autocommit = False
                cursor = connection.cursor()
                
                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete route data or invalid JSON object")
                
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
                
                # Retrieve request data
                origin = request_data['origin']
                destination = request_data['destination']
                duration_minutes = request_data['durationMinutes']
                base_price = request_data['basePrice']

                # Validate route data
                if not validate_route_data(origin, destination, duration_minutes, base_price):
                    raise Exception("Invalid route data")

                base_price_json = json.dumps(base_price)

                # Create route
                procedure_status = 0
                result_args = cursor.callproc('CreateRoute', (origin, destination, duration_minutes, base_price_json, 0))
                procedure_status = result_args[-1]

                
                if procedure_status == 1:
                    connection.commit()
                    connection.close()
                else:
                    raise Exception("Invalid route data")

                # Return a success response with a 201 status code
                return make_response({"message": "Route and base_price records created successfully"}, 201)
            except Exception as ex:
                connection.rollback()
                connection.close()
                if str(ex) == "403":
                    return abort(403, message="Only data entry operators are allowed to create route records")
                return abort(400, message=f"Failed to create route record. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
