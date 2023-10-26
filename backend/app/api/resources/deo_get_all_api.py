from flask import make_response
from app.utils.db import get_db_connection_staff
from flask_restful import Resource, abort
from flask_jwt_extended import jwt_required, get_jwt_identity


class DEOGetAllModels(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(buffered=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                query = """
                    SELECT Model_ID, Name FROM model 
                """
                # execute query to get all models
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                        'modelID': item[0],
                        'name': item[1]
                    })
                connection.close()
                
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only staff can access API")
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
        

class DEOGetAllRoutes(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(buffered=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                query = """
                    SELECT 
                        rut.Route_ID as routeID,
                        rut.Duration_Minutes as durationMinutes,
                        org.ICAO_Code AS fromICAO,
                        org.IATA_Code AS fromIATA,
                        SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT orgloc.Name ORDER BY orgloc.Level ASC), ',', 1) AS fromCity,
                        des.ICAO_Code AS toICAO,
                        des.IATA_Code AS toIATA,
                        SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT desloc.Name ORDER BY desloc.Level ASC), ',', 1) AS toCity
                    FROM
                        route AS rut
                        INNER JOIN airport AS org ON rut.Origin = org.ICAO_Code
                        INNER JOIN location AS orgloc ON orgloc.Airport = org.ICAO_Code
                        INNER JOIN airport AS des ON rut.Destination = des.ICAO_Code
                        INNER JOIN location AS desloc ON desloc.Airport = des.ICAO_Code
                    GROUP BY desloc.Airport , orgloc.Airport;
                """
                # Execute query to get all routes
                cursor.execute(query)
                items = cursor.fetchall()
                
                response=[]
                for item in items:
                    response.append({
                        'routeID': item[0],
                        'durationMinutes': item[1],
                        'fromICAO': item[2],
                        'fromIATA': item[3],
                        'fromCity': item[4],
                        'toICAO': item[5],
                        'toIATA': item[6],
                        'toCity': item[7]
                    })
                connection.close()
                
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only staff can access API")
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class DEOGetAllAirports(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(buffered=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                query = """
                    SELECT 
                        airport.ICAO_Code,
                        airport.IATA_Code,
                        location.Name 
                    FROM 
                        airport
                        LEFT JOIN location ON airport.ICAO_Code = location.Airport AND location.level = 0
                """
                # Execute query to get all airports
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                        'icaoCode': item[0],
                        'iataCode': item[1],
                        'city':item[2]
                    })
                connection.close()
                
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only staff can access API")
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
        

class DEOGetAllAirplanes(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection_staff()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(buffered=True)

                # Get current user
                current_user = get_jwt_identity()

                query = """
                    SELECT * FROM staff WHERE Username = %s
                """

                # Execute query with username
                cursor.execute(query,(current_user,))
                items = cursor.fetchone()

                if items is None:
                    raise Exception("403")
                
                query = """
                    SELECT 
                        airplane.Tail_Number,
                        model.name 
                    FROM 
                        airplane 
                        LEFT JOIN model ON airplane.Model = model.Model_ID
                """
                # Execute query to get all airplanes
                cursor.execute(query)
                items = cursor.fetchall()
                print(items)
                response=[]
                for item in items:
                    response.append({
                        'tailNumber': item[0],
                        'modelName': item[1]
                    })
                connection.close()
                
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message="Only staff can access API")
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
