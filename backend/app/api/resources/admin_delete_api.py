from flask import make_response
from app.utils.db import get_db_connection_admin
from flask_restful import Resource, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.validators import validate_icao_code, validate_flight_id, validate_tail_number, validate_route_id, validate_model_id


class AdminDeleteModel(Resource):
    @jwt_required()
    def delete(self, model_id):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # validate search parameters
                if not validate_model_id(int(model_id)):
                    raise Exception("Invalid search parameters")
                
                query = """
                    DELETE FROM model WHERE Model_ID = %s
                """

                # Execute query with model id
                cursor.execute(query,(int(model_id),))
                connection.commit()
                connection.close()
                
                return make_response("Model Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                return abort(400, message=f"Failed to Delete Model. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class AdminDeleteRoute(Resource):
    @jwt_required()
    def delete(self, route_id):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # validate search parameters
                if not validate_route_id(int(route_id)):
                    raise Exception("Invalid search parameters")
                
                query = """
                    DELETE FROM route WHERE Route_ID = %s
                """

                # Execute query with route id
                cursor.execute(query,(int(route_id),))
                connection.commit()
                connection.close()
                
                return make_response("Route Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                return abort(400, message=f"Failed to Delete Route. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class AdminDeleteAirport(Resource):
    @jwt_required()
    def delete(self, icao_code):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # validate search parameters
                if not validate_icao_code(icao_code):
                    raise Exception("Invalid search parameters")
                
                query = """
                    DELETE FROM airport WHERE ICAO_Code = %s
                """

                # Execute query with airport icao code
                cursor.execute(query,(icao_code,))
                connection.commit()
                connection.close()
                
                return make_response("Airport Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                return abort(400, message=f"Failed to Delete Airport. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class AdminDeleteAirplane(Resource):
    @jwt_required()
    def delete(self, tail_number):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # validate search parameters
                if not validate_tail_number(tail_number):
                    raise Exception("Invalid search parameters")
                
                query = """
                    DELETE FROM airplane WHERE Tail_Number = %s
                """

                # Execute query with airplane tail number
                cursor.execute(query,(tail_number,))
                connection.commit()
                connection.close()
                
                return make_response("Airplane Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                return abort(400, message=f"Failed to Delete Airplane. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class AdminDeleteScheduledFlight(Resource):
    @jwt_required()
    def delete(self, flight_id):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                # validate search parameters
                if not validate_flight_id(int(flight_id)):
                    raise Exception("Invalid search parameters")
                
                query = """
                    DELETE FROM scheduled_flight WHERE Scheduled_ID = %s
                """

                # Execute query with scheduled flight id
                cursor.execute(query,(int(flight_id),))
                print("reached")
                connection.commit()
                connection.close()
                
                return make_response("Scheduled Flight Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                if (ex.args[1]=='1644 (45000): Flight has paid bookings'):
                    try:
                        cursor.execute("""
                            UPDATE scheduled_flight SET Departure_Time = '2000-01-01 00:00:00' WHERE Scheduled_ID = %s;
                        """, (int(flight_id),))
                        connection.commit()
                        connection.close()
                        return make_response("Scheduled Flight was not deleted. Hidden From Users", 409)
                    except Exception as ex:
                        raise Exception(f"Failed to reschedule")
                return abort(400, message=f"Failed to Delete Scheduled Flight. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")

