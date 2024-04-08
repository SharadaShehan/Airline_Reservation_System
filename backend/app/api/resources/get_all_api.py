from flask import make_response
from app.utils.db import get_db_connection_guest_user
from flask_restful import Resource, abort
from app.api.cache import AppCache

# cache = AppCache.get_cache()

class GetAllModels(Resource):
    @(AppCache.get_cache()).cached(timeout=30)
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                
                query = """
                    SELECT Model_ID, Name FROM model 
                """
                # Execute query with username
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
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
        

class GetAllRoutes(Resource):
    @(AppCache.get_cache()).cached(timeout=30)
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                
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
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")


class GetAllAirports(Resource):
    @(AppCache.get_cache()).cached(timeout=30)
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                
                query = """
                    SELECT 
                        airport.ICAO_Code,
                        airport.IATA_Code,
                        location.Name 
                    FROM 
                        airport
                        LEFT JOIN location ON airport.ICAO_Code = location.Airport AND location.level = 0
                """
                # Execute query with username
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
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
        

class GetAllAirplanes(Resource):
    @(AppCache.get_cache()).cached(timeout=30)
    def get(self):
        try:
            connection = get_db_connection_guest_user()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor(prepared=True)
                
                query = """
                    SELECT 
                        airplane.Tail_Number,
                        model.name 
                    FROM 
                        airplane 
                        LEFT JOIN model ON airplane.Model = model.Model_ID
                """
                # Execute query with username
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                        'tailNumber': item[0],
                        'modelName': item[1]
                    })
                connection.close()
                
                return make_response(response, 200)
            except Exception as ex:
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(403, message="Unauthorized Access")
