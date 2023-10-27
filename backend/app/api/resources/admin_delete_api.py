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
                
                # check if model is in the database
                query = "SELECT * FROM model WHERE Model_ID = %s"
                cursor.execute(query,(int(model_id),))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
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
                if str(ex) == "404":
                    return abort(404, message="Model not found")
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
                
                # check if route is in the database
                query = "SELECT * FROM route WHERE Route_ID = %s"
                cursor.execute(query,(int(route_id),))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
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
                if str(ex) == "404":
                    return abort(404, message="Route not found")
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
                
                # check if airport is in the database
                query = "SELECT * FROM airport WHERE ICAO_Code = %s"
                cursor.execute(query,(icao_code,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
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
                if str(ex) == "404":
                    return abort(404, message="Airport not found")
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
                
                # check if airplane is in the database
                query = "SELECT * FROM airplane WHERE Tail_Number = %s"
                cursor.execute(query,(tail_number,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
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
                if str(ex) == "404":
                    return abort(404, message="Airplane not found")
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
                
                # check if scheduled flight is in the database
                query = "SELECT * FROM scheduled_flight WHERE Scheduled_ID = %s"
                cursor.execute(query,(int(flight_id),))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
                query = """
                    DELETE FROM scheduled_flight WHERE Scheduled_ID = %s
                """

                # Execute query with scheduled flight id
                cursor.execute(query,(int(flight_id),))
                connection.commit()
                connection.close()
                
                return make_response("Scheduled Flight Deleted Successfully", 204)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                if str(ex) == "404":
                    return abort(404, message="Scheduled Flight not found")
                return abort(400, message=f"Failed to Delete Scheduled Flight. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class AdminHideScheduledFlight(Resource):
    @jwt_required()
    def patch(self, flight_id):
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
                
                # check if scheduled flight is in the database
                query = "SELECT * FROM scheduled_flight WHERE Scheduled_ID = %s"
                cursor.execute(query,(int(flight_id),))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("404")
                
                query = """
                    UPDATE scheduled_flight SET Departure_Time = '2000-01-01 00:00:00' WHERE Scheduled_ID = %s;
                """

                # Execute query with scheduled flight id
                cursor.execute(query,(int(flight_id),))
                connection.commit()
                connection.close()
                
                return make_response("Scheduled Flight Hidden Successfully", 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only admins can access API")
                if str(ex) == "404":
                    return abort(404, message="Scheduled Flight not found")
                return abort(400, message=f"Failed to Hide Scheduled Flight. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
