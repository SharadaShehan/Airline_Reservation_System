from app.scripts.db import get_db_connection


def drop_all_views():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_view_queries = []
        views_list = [
            "flight",
            "seat_reservation",
            "ticket",
            "passenger"
        ]
        
        # Generate drop queries for all views and append to drop_queries list
        for view_name in views_list:
            drop_view_queries.append(f"DROP VIEW IF EXISTS {view_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_view_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_views():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create flight view -------
        create_flight_view_query = """
            CREATE OR REPLACE VIEW flight AS
            SELECT 
                shf.Scheduled_ID AS ID,
                org.ICAO_Code AS originICAO,
                des.ICAO_Code AS destinationICAO,
                org.IATA_Code AS originIATA,
                des.IATA_Code AS destinationIATA,
                GROUP_CONCAT(DISTINCT orgloc.Name ORDER BY orgloc.Level ASC SEPARATOR ',') AS originAddress,
                GROUP_CONCAT(DISTINCT desloc.Name ORDER BY desloc.Level ASC SEPARATOR ',') AS destinationAddress,
                DATE_ADD(shf.Departure_Time, INTERVAL shf.Delay_Minutes MINUTE) AS departureDateAndTime,
                DATE_ADD(shf.Departure_Time, INTERVAL shf.Delay_Minutes + rut.Duration_Minutes MINUTE) AS arrivalDateAndTime,
                rut.Duration_Minutes AS durationMinutes,
                mdl.Name AS airplaneModel,
                apl.Tail_Number AS tailNumber
            FROM
                scheduled_flight AS shf
                INNER JOIN route AS rut ON rut.Route_ID = shf.Route
                INNER JOIN airport AS org ON rut.Origin = org.ICAO_Code
                INNER JOIN location AS orgloc ON orgloc.Airport = org.ICAO_Code
                INNER JOIN airport AS des ON rut.Destination = des.ICAO_Code
                INNER JOIN location AS desloc ON desloc.Airport = des.ICAO_Code
                INNER JOIN airplane AS apl ON shf.Airplane = apl.Tail_Number
                INNER JOIN model AS mdl ON apl.Model = mdl.Model_ID
            WHERE
                DATE(DATE_ADD(shf.Departure_Time, INTERVAL shf.Delay_Minutes MINUTE)) >= CURDATE()
            GROUP BY shf.Scheduled_ID , desloc.Airport , orgloc.Airport;
        """
        cursor.execute(create_flight_view_query)
        #----------------------------------

        #------- Create seat reservation view -------
        create_seat_reservation_view_query = """
            CREATE OR REPLACE VIEW seat_reservation AS
            SELECT 
                subquery2.id AS ID,
                subquery2.clas AS class,
                subquery2.count AS totalCount,
                IFNULL(subquery1.count, 0) AS reservedCount,
                IFNULL(subquery1.bookedSeats, '') AS bookedSeats
            FROM
                (SELECT 
                    shf.Scheduled_ID AS id,
                    cls.Class_Name AS clas,
                    COUNT(*) AS count,
                    GROUP_CONCAT(bk.Seat_Number ORDER BY bk.Seat_Number ASC SEPARATOR ',') AS bookedSeats
                    FROM
                        booked_seat AS bk
                        INNER JOIN booking AS bkset ON bk.Booking = bkset.Booking_Ref_ID
                        INNER JOIN base_price AS bprc ON bkset.BPrice_Per_Booking = bprc.Price_ID
                        INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                        INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                        GROUP BY shf.Scheduled_ID , cls.Class_Name) 
                    AS subquery1
                RIGHT JOIN
                (SELECT 
                    shf.Scheduled_ID AS id,
                    cls.Class_Name AS clas,
                    cpt.Seats_Count AS count,
                    date(shf.Departure_Time) as date
                    FROM
                        scheduled_flight AS shf
                        INNER JOIN airplane AS apl ON shf.Airplane = apl.Tail_Number
                        INNER JOIN model AS mdl ON apl.Model = mdl.Model_ID
                        INNER JOIN capacity AS cpt ON mdl.Model_ID = cpt.Model
                        INNER JOIN class AS cls ON cpt.Class = cls.Class_Name)
                    AS subquery2 
                ON subquery1.id = subquery2.id AND subquery1.clas = subquery2.clas
            WHERE DATE(subquery2.date) >= CURDATE()
            ORDER BY subquery2.id;
        """
        cursor.execute(create_seat_reservation_view_query)
        #----------------------------------

        #------- Create ticket view -------
        create_ticket_view_query = """
            CREATE OR REPLACE VIEW ticket AS
            SELECT 
                bk.Ticket_Number AS ticketNumber,
                CONCAT(bk.FirstName, ' ', bk.LastName) AS passenger,
                CONCAT('BA', LPAD(CAST(rut.Route_ID AS CHAR (4)), 4, '0')) AS flight,
                CONCAT(bk.Seat_Number, cls.Class_Code) AS seat, org.IATA_Code AS fromIATA,
                SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT orgloc.Name ORDER BY orgloc.Level ASC), ',', 1) AS fromCity,
                des.IATA_Code AS toIATA,
                SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT desloc.Name ORDER BY desloc.Level ASC), ',', 1) AS toCity,
                DATE(shf.Departure_Time) AS departureDate,
                DATE_FORMAT(shf.Departure_Time, '%H:%i') AS departureTime,
                cls.Class_Name AS class,
                bkset.Booking_Ref_ID AS bookingRefID,
                usr.Username AS bookedUser,
                bk.Passport_ID AS passportID,
                CASE
                    WHEN bkset.Completed = 1 THEN 'Active'
                    ELSE 'Payment Pending'
                END AS status
            FROM
                booked_seat AS bk
                INNER JOIN booking AS bkset ON bk.Booking = bkset.Booking_Ref_ID
                LEFT JOIN registered_user AS usr ON bkset.User = usr.Username
                INNER JOIN base_price AS bprc ON bkset.BPrice_Per_Booking = bprc.Price_ID
                INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                INNER JOIN route AS rut ON shf.Route = rut.Route_ID
                INNER JOIN airport AS org ON rut.Origin = org.ICAO_Code
                INNER JOIN location AS orgloc ON orgloc.Airport = org.ICAO_Code
                INNER JOIN airport AS des ON rut.Destination = des.ICAO_Code
                INNER JOIN location AS desloc ON desloc.Airport = des.ICAO_Code
            WHERE
                DATE(shf.Departure_Time) >= CURDATE()
            GROUP BY bk.Ticket_Number , desloc.Airport , orgloc.Airport;
        """
        cursor.execute(create_ticket_view_query)
        #----------------------------------

        #------- Create passenger view -------
        create_passenger_view_query = """
            CREATE OR REPLACE VIEW passenger AS
            SELECT 
                bk.Ticket_Number AS ticketNumber,
                CONCAT(bk.FirstName, ' ', bk.LastName) AS name,
                CONCAT(bk.Seat_Number, cls.Class_Code) AS seat,
                bk.IsAdult as isAdult,
                org.ICAO_Code AS 'fromICAO',
                des.ICAO_Code AS 'toICAO',
                shf.Departure_Time AS departureDateTime,
                shf.Scheduled_ID AS flightID,
                cls.Class_Name AS class,
                bk.Passport_ID AS passportID,
                bkset.Completed AS isPaymentDone,
                bkset.Booking_Ref_ID AS bookingRefID,
                IFNULL(ctg.Category_Name, 'Guest') AS userType
            FROM
                booked_seat AS bk
                INNER JOIN booking AS bkset ON bk.Booking = bkset.Booking_Ref_ID
                LEFT JOIN registered_user AS usr ON bkset.User = usr.Username
                INNER JOIN base_price AS bprc ON bkset.BPrice_Per_Booking = bprc.Price_ID
                INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                INNER JOIN route AS rut ON shf.Route = rut.Route_ID
                INNER JOIN airport AS org ON rut.Origin = org.ICAO_Code
                INNER JOIN airport AS des ON rut.Destination = des.ICAO_Code
                LEFT JOIN user_category AS ctg ON usr.Category = ctg.Category_ID
			ORDER BY bk.Ticket_Number;
        """
        cursor.execute(create_passenger_view_query)
        #----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create views")




