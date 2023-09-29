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
                select a.Route_ID,b.IATA_Code as originIATA,d.Name as originlocation,c.IATA_Code as destinationIATA,
                e.Name as destinationLocation,a.Duration_Minutes from route as a left join airport as b  
                on a.Origin=b.ICAO_Code 
                left join airport as c on a.Destination=c.ICAO_Code 
                left join location as d on a.Origin =d.Airport and d.level=0 
                left join location as e on a.Destination=e.Airport and e.level=0"""
                
                cursor.execute(query)
                items = cursor.fetchall()
                response=[]
                for item in items:
                    response.append({
                    'id': item[0],
                    'originIATA': item[1],
                    'originlocation':item[2],
                    'destinationIATA':item[3],
                    'destinationLocation':item[4],
                    'durationMinutes':item[5]
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
        