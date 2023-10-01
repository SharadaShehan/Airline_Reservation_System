from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_airplane_data
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('tailNumber', type=str, required=True)
parser.add_argument('modelID', type=int, required=True)


class CreateAirplane(Resource):
    @jwt_required()
    def post(self):
        
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to the database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor()

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete airplane data or invalid JSON object")
                
                # check if user is data entry operator
                current_user = get_jwt_identity()
                cursor.execute(f"SELECT IsDataEntryOperator FROM user WHERE Username = '{current_user}'")
                is_deo = cursor.fetchone()[0]

                if is_deo != 1:
                    raise Exception("403")

                # Retrieve request data
                tail_number = request_data['tailNumber']
                model_id = request_data['modelID']

                # Validate airplane data
                if not validate_airplane_data(tail_number, model_id):
                    raise Exception("Invalid airplane data")

                # Insert a new record into the 'airplane' table
                cursor.execute("INSERT INTO airplane (Tail_Number, Model) VALUES (%s, %s)",
                               (tail_number, model_id))
                connection.commit()

                connection.close()
                
                return make_response({"message": "Airplane record created successfully"}, 201)
            except Exception as ex:
                return abort(400, message=f"Failed to create airplane record. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to the database")
