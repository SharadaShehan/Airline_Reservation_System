from flask import jsonify
from app.utils.db import get_db_connection
from flask_restful import Resource, abort, reqparse
from app.utils.validators import validate_user_data
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity



class GetmodelDetails(Resource):
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                
                query = """
                SELECT Model_ID, Name
                FROM model """
                # Execute query with username
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                    'Model_ID': item[0],
                    'Name': item[1]
                    }
                    )
                connection.close()
                if items is None:
                    return abort(500, message="No model details Found")
                else:
                    return jsonify(response)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")
        

class Getallroutes(Resource):
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                
                query = """
                SELECT b.Route_ID,b.Origin,b.IATA_Code,b.Destination,airport.IATA_Code,b.Duration_Minutes from (SELECT route.Route_ID,airport.IATA_Code,route.Origin,route.Destination,route.Duration_Minutes
                FROM route left join 
                airport on route.Origin=airport.ICAO_Code) as b 
                left join airport on b.Destination=airport.ICAO_Code  """
                # Execute query with username
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                    'Route_ID': item[0],
                    'Origin': item[1],
                    'IATA_Code':item[2],
                    'Destination':item[3],
                    'Destination IATA':item[4],
                    'Duration_Minutes':item[5]
                    }
                    )
                connection.close()
                if items is None:
                    return abort(500, message="No route details Found")
                else:
                    return jsonify(response)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")

class Getallairports(Resource):
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                
                query = """
                SELECT airport.ICAO_Code,airport.IATA_Code,location.Name from airport left join location 
                on airport.ICAO_Code=location.Airport and location.level=0"""
                # Execute query with username
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                    'ICAO_Code': item[0],
                    'IATA_Code': item[1],
                    'location':item[2]
                    }
                    )
                connection.close()
                if items is None:
                    return abort(500, message="No airport Found")
                else:
                    return jsonify(response)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")
        
        
class Getallairplanes(Resource):
    def get(self):
        try:
            connection = get_db_connection()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")
        
        if connection:
            try:
                cursor = connection.cursor()
                
                query = """
                SELECT airplane.Tail_Number,model.name from airplane left join model 
                on airplane.Model=model.Model_ID"""
                # Execute query with username
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                    'tailNumber': item[0],
                    'modelName': item[1]
                    }
                    )
                connection.close()
                if items is None:
                    return abort(500, message="No airplane Found")
                else:
                    return jsonify(response)
            except Exception as ex:
                print(ex)
                return abort(400, message=f"Failed to Access URL. Error: {ex}")
        else:
            return abort(500, message="Failed to connect to database")
        