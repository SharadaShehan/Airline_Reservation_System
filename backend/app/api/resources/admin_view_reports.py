from flask import make_response
from app.utils.db import get_db_connection_admin
from flask_restful import Resource, abort
from flask_jwt_extended import jwt_required, get_jwt_identity


class GetRevenueByModel(Resource):
    @jwt_required()
    def get(self):
        try:
            connection = get_db_connection_admin()
        except Exception as ex:
            return abort(500, message=f"Failed to connect to database. Error: {ex}")

        if connection:
            try:
                cursor = connection.cursor(prepared=True)

                # check if user is admin
                username = get_jwt_identity()
                cursor.execute("SELECT * FROM staff WHERE Username = %s AND Role = 'Admin'", (username,))
                query_result = cursor.fetchone()
                
                if query_result is None or query_result[0] is None:
                    raise Exception("403")
                
                # Get revenue by model
                cursor.execute("""
                    SELECT mdl.Name AS model, COUNT(*) AS bookingSetsCount, SUM(bkset.Final_Price) AS revenue
                    FROM
                        booking AS bkset
                        INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                        INNER JOIN airplane AS apl ON shf.Airplane = apl.Tail_Number
                        INNER JOIN model AS mdl ON apl.Model = mdl.Model_ID
                        WHERE bkset.Completed = 1
                    GROUP BY mdl.Model_ID
                """)
                query_result = cursor.fetchall()

                response = []
                for item in query_result:
                    response.append({
                        "model": item[0],
                        "bookingSetsCount": item[1],
                        "revenue": item[2]
                    })

                connection.close()
                return make_response(response, 200)
            except Exception as ex:
                if str(ex) == "403":
                    return abort(403, message=f"Account is not an Administarator")
                print(ex)
                return abort(400, message=f"Failed to get reserved seats. Error: {ex}.")
        else:
            return abort(403, message="Unauthozrzed access")
