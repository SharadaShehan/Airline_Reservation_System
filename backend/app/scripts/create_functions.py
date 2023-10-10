from app.scripts.db import get_db_connection


def drop_all_functions():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_function_queries = []
        functions_list = [
            "GenerateRandomGuestID",
            "GenerateRandomString",
            "CalculateFinalPrice"
        ]
        
        # Generate drop queries for all functions and append to drop_queries list
        for funcation_name in functions_list:
            drop_function_queries.append(f"DROP FUNCTION IF EXISTS {funcation_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_function_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_functions():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create generate random string procedure -------
        create_generate_random_string_query = """
            CREATE FUNCTION GenerateRandomString()
            RETURNS CHAR(12)
            DETERMINISTIC
            NO SQL
            BEGIN
                DECLARE randomString CHAR(12);
                
                REPEAT
                    SET randomString = (
                        SELECT
                            SUBSTRING(
                                (SELECT
                                    GROUP_CONCAT(SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', FLOOR(1 + RAND() * 36), 1) ORDER BY RAND() SEPARATOR '')
                                AS randomLongString
                                FROM
                                    information_schema.tables),
                                1, 12
                            ) AS randomString
                    );

                UNTIL NOT EXISTS (SELECT 1 FROM booking WHERE Booking_Ref_ID = randomString)
                END REPEAT;

                RETURN randomString;
            END;
        """
        cursor.execute(create_generate_random_string_query)
        #----------------------------------

        #------- Create calculate final price function -------
        create_calculate_final_price_query = """
            CREATE FUNCTION CalculateFinalPrice(scheduled_flight_id INTEGER, acc_username VARCHAR(30), travel_class VARCHAR(10), booking_count SMALLINT )
            RETURNS DECIMAL(8,2)
            DETERMINISTIC
            NO SQL
            BEGIN
                DECLARE basePriceOfClass DECIMAL(8,2);
                DECLARE basicPrice DECIMAL(8,2);
                DECLARE discountPercent DECIMAL(5,4);
                DECLARE discount DECIMAL(8,2);
                DECLARE finalPrice DECIMAL(8,2);
                
                -- Get Basic Price Of Class and Route Per booking
                SELECT bprc.Price INTO basePriceOfClass
                FROM scheduled_flight as shf
                INNER JOIN route as rut on shf.Route= rut.Route_ID
                INNER JOIN base_price as bprc on rut.Route_ID = bprc.Route
                INNER JOIN class as cls on bprc.Class = cls.Class_Name
                WHERE shf.Scheduled_ID = scheduled_flight_id and cls.Class_Name = travel_class;
                
                IF acc_username = 'NULL' THEN
                    -- Guest User
                    SET discountPercent = 0.0000;
                ELSE
                    -- Get Discount based on Registered User's Category
                    SELECT ctg.Discount INTO discountPercent
                    FROM registered_user as usr
                    INNER JOIN user_category as ctg on usr.Category = ctg.Category_ID
                    WHERE usr.Username = acc_username;
                END IF;
                
                SET basicPrice = basePriceOfClass * booking_count;
                SET discount = basicPrice * discountPercent;
                SET finalPrice = basicPrice - discount;
                RETURN finalPrice;
            END;
        """
        cursor.execute(create_calculate_final_price_query)
        #----------------------------------

        #------- Create generate random guest id procedure -------
        create_generate_random_guest_ID_query = """
            CREATE FUNCTION GenerateRandomGuestID()
            RETURNS CHAR(12)
            DETERMINISTIC
            NO SQL
            BEGIN
                DECLARE randomString CHAR(12);
                
                REPEAT
                    SET randomString = (
                        SELECT
                            SUBSTRING(
                                (SELECT
                                    GROUP_CONCAT(SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', FLOOR(1 + RAND() * 36), 1) ORDER BY RAND() SEPARATOR '')
                                AS randomLongString
                                FROM
                                    information_schema.tables),
                                1, 12
                            ) AS randomString
                    );

                UNTIL NOT EXISTS (SELECT 1 FROM guest WHERE Guest_ID = randomString)
                END REPEAT;

                RETURN randomString;
            END;
        """
        cursor.execute(create_generate_random_guest_ID_query)
        #----------------------------------

        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create views")

