from app.scripts.db import get_db_connection


def drop_all_procedures():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_procedure_queries = []
        procedures_list = [
            "CompleteBooking",
            "CreateBooking",
            "UserCreateBooking",
            "GuestCreateBooking",
            "ScheduleFlight",
            "CreateAirport",
            "CreateModel",
            "CreateRoute"
        ]
        
        # Generate drop queries for all procedures and append to drop_queries list
        for procedure_name in procedures_list:
            drop_procedure_queries.append(f"DROP PROCEDURE IF EXISTS {procedure_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_procedure_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_procedures():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create complete booking procedure -------
        
        create_complete_booking_query = """
            CREATE PROCEDURE CompleteBooking(IN Ref_ID CHAR(12))
            BEGIN
                DECLARE totalBookingsCount SMALLINT;
                DECLARE currentUser VARCHAR(30);
                DECLARE minBookCountGeneral VARCHAR(10);
                DECLARE idGeneral SMALLINT;
                DECLARE minBookCountFrequent VARCHAR(10);
                DECLARE idFrequent SMALLINT;
                DECLARE minBookCountGold VARCHAR(10);
                DECLARE idGold SMALLINT;
                
                START TRANSACTION;
                    
                    -- Set booking as completed
                    UPDATE booking
                    SET Completed = 1
                    WHERE Booking_Ref_ID = Ref_ID;

                    -- Select current user
                    SELECT usr.Username INTO currentUser
                    FROM booking as bkset
                    INNER JOIN registered_user as usr on bkset.User = usr.Username
                    WHERE bkset.Booking_Ref_ID = Ref_ID;
  
                    -- Get booking count of user
                    SELECT COUNT(distinct bk.Ticket_Number) INTO totalBookingsCount 
                    FROM booking as bkset
                    INNER JOIN booked_seat as bk on bkset.Booking_Ref_ID = bk.Booking
                    INNER JOIN registered_user as usr on bkset.User = usr.Username
                    WHERE usr.Username = currentUser;
  
                    -- Get details related to each category
                    SELECT ctg.Category_ID, ctg.Min_Bookings INTO idGeneral, minBookCountGeneral
                    FROM user_category as ctg 
                    WHERE ctg.Category_Name = 'General';
                    
                    SELECT ctg.Category_ID, ctg.Min_Bookings INTO idFrequent, minBookCountFrequent
                    FROM user_category as ctg 
                    WHERE ctg.Category_Name = 'Frequent';
                    
                    SELECT ctg.Category_ID, ctg.Min_Bookings INTO idGold, minBookCountGold
                    FROM user_category as ctg 
                    WHERE ctg.Category_Name = 'Gold';
                    
                    -- Update user category
                    IF totalBookingsCount >= minBookCountGold THEN
                        UPDATE registered_user
                        SET Category = idGold
                        WHERE Username = currentUser;
                    ELSEIF totalBookingsCount >= minBookCountFrequent THEN
                        UPDATE registered_user
                        SET Category = idFrequent
                        WHERE Username = currentUser;
                    ELSE
                        UPDATE registered_user
                        SET Category = idGeneral
                        WHERE Username = currentUser;
                    END IF;

                    UPDATE registered_user
                    SET Bookings_Count = totalBookingsCount
                    WHERE Username = currentUser;

                COMMIT;
            END;
        """
        cursor.execute(create_complete_booking_query)
        #----------------------------------

        #------- Create user create booking procedure -------
        
        create_user_create_booking_query = """
            CREATE PROCEDURE UserCreateBooking(
                IN scheduled_flight_id INTEGER, 
                IN acc_username VARCHAR(30), 
                IN travel_class VARCHAR(10), 
                IN booking_count SMALLINT, 
                IN passengers_json JSON,
                OUT refID CHAR(12),
                OUT finalPrice DECIMAL(8,2),
                OUT status_var BOOLEAN
            )

            BEGIN
                DECLARE i INTEGER DEFAULT 0;
                DECLARE basePricePerBooking DECIMAL(8,2);
                DECLARE seat_number SMALLINT;
                DECLARE first_name VARCHAR(30);
                DECLARE last_name VARCHAR(30);
                DECLARE is_adult BOOLEAN;
                DECLARE passportid VARCHAR(15);
                DECLARE seat_reserved BOOLEAN;
                DECLARE max_seat_number SMALLINT;
                
                DECLARE done BOOLEAN DEFAULT FALSE;
                DECLARE recordsCursor CURSOR FOR SELECT SeatNumber, FirstName, LastName, IsAdult, Passport_ID FROM booking_data;
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
                
                SET status_var = FALSE;

                SET refID = GenerateRandomString();
                SET finalPrice = CalculateFinalPrice(scheduled_flight_id, acc_username, travel_class, booking_count);

                DROP TEMPORARY TABLE IF EXISTS booking_data;

                CREATE TEMPORARY TABLE IF NOT EXISTS booking_data (
                        SeatNumber SMALLINT,
                        FirstName VARCHAR(30),
                        LastName VARCHAR(30),
                        IsAdult BOOLEAN,
                        Passport_ID VARCHAR(15) 
                );

                WHILE i < JSON_LENGTH(passengers_json) DO
                    SET seat_number = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].seatNumber')));
                    SET first_name = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].firstName')));
                    SET last_name = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].lastName')));
                    SET is_adult = JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].isAdult'));
                    SET passportid = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].passportID')));

                    INSERT INTO 
                        booking_data (SeatNumber, FirstName, LastName, IsAdult, Passport_ID) 
                    VALUES 
                        (seat_number, first_name, last_name, is_adult, passportid);

                    SET i = i + 1;
                END WHILE;

                START TRANSACTION;
                    
                    SELECT bprc.Price_ID INTO basePricePerBooking
                    FROM scheduled_flight AS shf
                    INNER JOIN route AS rut ON shf.Route = rut.Route_ID
                    INNER JOIN base_price AS bprc ON rut.Route_ID = bprc.Route
                    INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                    WHERE shf.Scheduled_ID = scheduled_flight_id AND cls.Class_Name = travel_class;
                    
                    INSERT INTO booking (Booking_Ref_ID, Scheduled_Flight, User, BPrice_Per_Booking, Final_price) 
                    VALUES (refID, scheduled_flight_id, acc_username, basePricePerBooking, finalPrice);
                    
                    OPEN recordsCursor;
                    readLoop: LOOP
                        FETCH recordsCursor INTO seat_number, first_name, last_name, is_adult, passportid;
                        IF done THEN
                            LEAVE readLoop;
                        END IF;

                        SET seat_reserved = 0;
                        
                    	SELECT 
                            ( COUNT(*) > 0 ) INTO seat_reserved
                        FROM
                            booked_seat AS bk
                            INNER JOIN booking AS bkset ON bk.Booking = bkset.Booking_Ref_ID
                            INNER JOIN base_price AS bprc ON bkset.BPrice_Per_Booking = bprc.Price_ID
                            INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                            INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                        WHERE shf.Scheduled_ID = scheduled_flight_id and  cls.Class_Name = travel_class and bk.Seat_Number = seat_number;

                        IF seat_reserved THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat Already Booked';
                        END IF;

                        SELECT cpt.Seats_Count INTO max_seat_number
                        FROM 
                            scheduled_flight AS shf
                            INNER JOIN airplane AS apl ON shf.Airplane = apl.Tail_Number
                            INNER JOIN model AS mdl ON apl.Model = mdl.Model_ID
                            INNER JOIN capacity AS cpt ON mdl.Model_ID = cpt.Model
                            INNER JOIN class AS cls ON cpt.Class = cls.Class_Name
                        WHERE 
                            shf.Scheduled_ID = scheduled_flight_id
                            AND cls.Class_Name = travel_class;
                        
                        IF seat_number > max_seat_number THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat Number Exceeds Maximum Seat Count';
                        END IF;
                        
                        INSERT INTO booked_seat (Booking, Seat_Number, FirstName, LastName, IsAdult, Passport_ID) 
                        VALUES (refID, seat_number, first_name, last_name, is_adult, passportid);
                        
                    END LOOP;
                    CLOSE recordsCursor;

                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_user_create_booking_query)
        #----------------------------------

        #------- Create guest create booking procedure -------
        
        create_guest_create_booking_query = """
            CREATE PROCEDURE GuestCreateBooking(
                IN scheduled_flight_id INTEGER, 
                IN in_guest_id CHAR(12), 
                IN travel_class VARCHAR(10), 
                IN booking_count SMALLINT, 
                IN passengers_json JSON,
                IN email VARCHAR(50),
                IN contact_number VARCHAR(16),
                OUT refID CHAR(12),
                OUT finalPrice DECIMAL(8,2),
                OUT out_guest_id CHAR(12),
                OUT status_var BOOLEAN
            )

            BEGIN
                DECLARE i INTEGER DEFAULT 0;
                DECLARE basePricePerBooking DECIMAL(8,2);
                DECLARE seat_number SMALLINT;
                DECLARE first_name VARCHAR(30);
                DECLARE last_name VARCHAR(30);
                DECLARE is_adult BOOLEAN;
                DECLARE passportid VARCHAR(15);
                DECLARE seat_reserved BOOLEAN;
                DECLARE max_seat_number SMALLINT;
                DECLARE guest_id CHAR(12);
                
                DECLARE done BOOLEAN DEFAULT FALSE;
                DECLARE recordsCursor CURSOR FOR SELECT SeatNumber, FirstName, LastName, IsAdult, Passport_ID FROM booking_data;
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
                
                SET status_var = FALSE;

                SET refID = GenerateRandomString();
                SET finalPrice = CalculateFinalPrice(scheduled_flight_id, 'NULL', travel_class, booking_count);

                DROP TEMPORARY TABLE IF EXISTS booking_data;

                CREATE TEMPORARY TABLE IF NOT EXISTS booking_data (
                        SeatNumber SMALLINT,
                        FirstName VARCHAR(30),
                        LastName VARCHAR(30),
                        IsAdult BOOLEAN,
                        Passport_ID VARCHAR(15) 
                );

                WHILE i < JSON_LENGTH(passengers_json) DO
                    SET seat_number = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].seatNumber')));
                    SET first_name = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].firstName')));
                    SET last_name = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].lastName')));
                    SET is_adult = JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].isAdult'));
                    SET passportid = JSON_UNQUOTE(JSON_EXTRACT(passengers_json, CONCAT('$[', i, '].passportID')));

                    INSERT INTO 
                        booking_data (SeatNumber, FirstName, LastName, IsAdult, Passport_ID) 
                    VALUES 
                        (seat_number, first_name, last_name, is_adult, passportid);

                    SET i = i + 1;
                END WHILE;

                START TRANSACTION;
                    
                    SELECT bprc.Price_ID INTO basePricePerBooking
                    FROM scheduled_flight AS shf
                    INNER JOIN route AS rut ON shf.Route = rut.Route_ID
                    INNER JOIN base_price AS bprc ON rut.Route_ID = bprc.Route
                    INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                    WHERE shf.Scheduled_ID = scheduled_flight_id AND cls.Class_Name = travel_class;
                    
                    INSERT INTO booking (Booking_Ref_ID, Scheduled_Flight, User, BPrice_Per_Booking, Final_price) 
                    VALUES (refID, scheduled_flight_id, NULL, basePricePerBooking, finalPrice);
                    
                    OPEN recordsCursor;
                    readLoop: LOOP
                        FETCH recordsCursor INTO seat_number, first_name, last_name, is_adult, passportid;
                        IF done THEN
                            LEAVE readLoop;
                        END IF;

                        SET seat_reserved = 0;
                        
                    	SELECT 
                            ( COUNT(*) > 0 ) INTO seat_reserved
                        FROM
                            booked_seat AS bk
                            INNER JOIN booking AS bkset ON bk.Booking = bkset.Booking_Ref_ID
                            INNER JOIN base_price AS bprc ON bkset.BPrice_Per_Booking = bprc.Price_ID
                            INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                            INNER JOIN scheduled_flight AS shf ON bkset.Scheduled_Flight = shf.Scheduled_ID
                        WHERE shf.Scheduled_ID = scheduled_flight_id and  cls.Class_Name = travel_class and bk.Seat_Number = seat_number;

                        IF seat_reserved THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat Already Booked';
                        END IF;

                        SELECT cpt.Seats_Count INTO max_seat_number
                        FROM 
                            scheduled_flight AS shf
                            INNER JOIN airplane AS apl ON shf.Airplane = apl.Tail_Number
                            INNER JOIN model AS mdl ON apl.Model = mdl.Model_ID
                            INNER JOIN capacity AS cpt ON mdl.Model_ID = cpt.Model
                            INNER JOIN class AS cls ON cpt.Class = cls.Class_Name
                        WHERE 
                            shf.Scheduled_ID = scheduled_flight_id
                            AND cls.Class_Name = travel_class;
                        
                        IF seat_number > max_seat_number THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat Number Exceeds Maximum Seat Count';
                        END IF;
                        
                        INSERT INTO booked_seat (Booking, Seat_Number, FirstName, LastName, IsAdult, Passport_ID) 
                        VALUES (refID, seat_number, first_name, last_name, is_adult, passportid);
                        
                    END LOOP;
                    CLOSE recordsCursor;

                    IF email = 'NULL' THEN
                        SET email = NULL;
                    END IF;

                    IF contact_number = 'NULL' THEN
                        SET contact_number = NULL;
                    END IF;

                    IF in_guest_id = '____________' THEN
                        SET out_guest_id = GenerateRandomGuestID();
                    ELSE
                        SET out_guest_id = in_guest_id;
                    END IF;

                    INSERT INTO guest (Guest_ID, Booking_Ref_ID, Email, Contact_Number)
                    VALUES (out_guest_id, refID, email, contact_number);

                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_guest_create_booking_query)
        #----------------------------------


        #------- Create schedule flight procedure -------

        create_schedule_flight_query = """
            CREATE PROCEDURE ScheduleFlight(
                IN route_int SMALLINT, 
                IN airplane_code VARCHAR(10), 
                IN departure_date CHAR(10), 
                IN departure_time CHAR(8),
                OUT status_var BOOLEAN)

            BEGIN
                DECLARE departure_datetime DATETIME;
                DECLARE lower_bound DATETIME;
                DECLARE upper_bound DATETIME;
                DECLARE duration SMALLINT;
                DECLARE scheduled_count SMALLINT;
                
                SET status_var = FALSE;
                
                START TRANSACTION;
                        
                        SELECT rut.Duration_Minutes INTO duration
                        FROM route as rut
                        WHERE rut.Route_ID = route_int;
                        
                        SET departure_datetime = STR_TO_DATE(CONCAT(departure_date, ' ', departure_time), '%Y-%m-%d %H:%i:%s');
                        SET lower_bound = DATE_SUB(departure_datetime, INTERVAL 1 HOUR);
                        SET upper_bound = DATE_ADD(departure_datetime, INTERVAL duration + 60 MINUTE);
                        
                        SELECT COUNT(*) INTO scheduled_count
                        FROM flight as flt
                        WHERE
                            flt.tailNumber = airplane_code
                            AND ( flt.departureDateAndTime > lower_bound AND flt.arrivalDateAndTime < upper_bound )
                            OR ( flt.departureDateAndTime < lower_bound AND flt.arrivalDateAndTime > upper_bound )
                            OR ( flt.departureDateAndTime < lower_bound AND flt.arrivalDateAndTime > lower_bound )
                            OR ( flt.departureDateAndTime < upper_bound AND flt.arrivalDateAndTime > upper_bound );

                        IF scheduled_count > 0 THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Airplane has scheduled flights at this time';
                        END IF;
                        
                        INSERT INTO scheduled_flight (Route, Airplane, Departure_Time) 
                        VALUES (route_int, airplane_code, departure_datetime);
                        
                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_schedule_flight_query)
        #----------------------------------

        #------- Create create airport procedure -------

        create_create_airport_query = """
            CREATE PROCEDURE CreateAirport(
                IN icao_code CHAR(4),
                IN iata_code CHAR(3),
                IN locations_json JSON,
                OUT status_var BOOLEAN)
            
            BEGIN
                DECLARE idx INTEGER DEFAULT 0;
                DECLARE airport_code CHAR(4);
                DECLARE name VARCHAR(20);
                DECLARE array_length INTEGER;
                
                SET status_var = FALSE;
                SET array_length = JSON_LENGTH(locations_json);
                
                START TRANSACTION;
                
                    INSERT INTO 
                        airport (ICAO_Code, IATA_Code) 
                    VALUES 
                        (icao_code, iata_code);
                    
                    SET airport_code = icao_code;

                    WHILE idx < array_length DO
                        SET name = JSON_UNQUOTE(JSON_EXTRACT(locations_json, CONCAT('$[', idx, ']')));
                        INSERT INTO 
                            location (Airport, level, name)
                        VALUES
                            (airport_code, idx, name);
                        
                        SET idx = idx + 1;
                    END WHILE;
        
                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_create_airport_query)
        #----------------------------------

        #------- Create create model procedure -------

        create_create_model_query = """
            CREATE PROCEDURE CreateModel(
                IN model_name VARCHAR(40),
                IN seats_count_json JSON,
                OUT status_var BOOLEAN)
            
            BEGIN
                DECLARE model_id INTEGER;
                DECLARE class_name VARCHAR(10);
                DECLARE seats_count SMALLINT;
                DECLARE keyIndex INTEGER DEFAULT 0;
                DECLARE totalKeys INTEGER;
                
                SET status_var = FALSE;
                SET totalKeys = JSON_LENGTH(JSON_KEYS(seats_count_json));

                START TRANSACTION;

                    INSERT INTO
                        model (Name)
                    VALUES
                        (model_name);

                    SET model_id = LAST_INSERT_ID();

                    WHILE keyIndex < totalKeys DO
                        SET class_name = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(seats_count_json), CONCAT('$[', keyIndex, ']')));
                        SET seats_count = JSON_UNQUOTE(JSON_EXTRACT(seats_count_json, CONCAT('$.', class_name)));

                        INSERT INTO
                            capacity (Model, Class, Seats_Count)
                        VALUES
                            (model_id, class_name, seats_count);
                        
                        SET keyIndex = keyIndex + 1;
                    END WHILE;

                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_create_model_query)
        #----------------------------------

        #------- Create create route procedure -------

        create_create_route_query = """
            CREATE PROCEDURE CreateRoute(
                IN origin VARCHAR(4),
                IN destination VARCHAR(4),
                IN duration_minutes SMALLINT,
                IN base_price_json JSON,
                OUT status_var BOOLEAN)

            BEGIN

                DECLARE route_id INTEGER;
                DECLARE class_name VARCHAR(10);
                DECLARE price DECIMAL(8,2);
                DECLARE keyIndex INTEGER DEFAULT 0;
                DECLARE totalKeys INTEGER;
                
                SET status_var = FALSE;

                SET totalKeys = JSON_LENGTH(JSON_KEYS(base_price_json));

                START TRANSACTION;

                    INSERT INTO
                        route (Origin, Destination, Duration_Minutes)
                    VALUES
                        (origin, destination, duration_minutes);
                    
                    SET route_id = LAST_INSERT_ID();

                    WHILE keyIndex < totalKeys DO
                        SET class_name = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(base_price_json), CONCAT('$[', keyIndex, ']')));
                        SET price = JSON_UNQUOTE(JSON_EXTRACT(base_price_json, CONCAT('$.', class_name)));

                        INSERT INTO
                            base_price (Route, Class, Price)
                        VALUES
                            (route_id, class_name, price);
                        
                        SET keyIndex = keyIndex + 1;
                    END WHILE;
                
                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_create_route_query)
        #----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create views")


