from flask import make_response
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_model_data
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True)
parser.add_argument('seatsCount', type=dict, required=True)


class CreateModel(Resource):
    @jwt_required()
    def post(self):

        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()

                try:
                    request_data = parser.parse_args()
                except Exception:
                    raise Exception("Incomplete model data or invalid JSON object")
                
                # check if user is data entry operator
                current_user = get_jwt_identity()
                cursor.execute(f"SELECT IsDataEntryOperator FROM user WHERE Username = '{current_user}'")
                is_deo = cursor.fetchone()[0]

                if is_deo != 1:
                    raise Exception("403")
                
                model_name = request_data['name']
                seats_count = request_data['seatsCount']

                # Validate model data
                if not validate_model_data(model_name, seats_count):
                    raise Exception("Invalid model data")

                cursor.execute("INSERT INTO model (Name) VALUES (%s)", (model_name,))
                connection.commit()

                try:
                    model_id = cursor.lastrowid

                    # Insert records into the 'capacity' table for each travel class in 'seats_count'
                    for class_name, count in seats_count.items():
                        cursor.execute("INSERT INTO capacity (Model, Class, Seats_Count) VALUES (%s, %s, %s)",
                                    (model_id, class_name, count))
                        connection.commit()
                except Exception:
                    # Delete the record from the 'model' table if insertion into 'capacity' table fails
                    cursor.execute(f"DELETE FROM model WHERE ID = {model_id}")
                    connection.commit()
                    raise Exception("Failed to insert capacity records")
                
                connection.close()

                return make_response({'message': 'Model and capacity records created successfully'}, 201)
            
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only data entry operators can create models")
                return abort(400, message=f"Failed to create model. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to the database")
