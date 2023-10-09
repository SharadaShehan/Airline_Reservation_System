from app.scripts.db import get_db_connection


def drop_all_procedures():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_procedure_queries = []
        procedures_list = [
            "CompleteBookingSet",
            "CreateBookingSet",
            "ScheduleFlight"
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

        #------- Create complete booking set procedure -------
        
        create_complete_booking_set_query = """
            CREATE PROCEDURE CompleteBookingSet(IN Ref_ID CHAR(12))
            BEGIN
                DECLARE totalBookingsCount SMALLINT;
                DECLARE currentUser VARCHAR(30);
                DECLARE minBookCountGeneral VARCHAR(10);
                DECLARE idGeneral SMALLINT;
                DECLARE minBookCountFrequent VARCHAR(10);
                DECLARE idFrequent SMALLINT;
                DECLARE minBookCountGold VARCHAR(10);
                DECLARE idGold SMALLINT;

                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                    BEGIN
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SQLError occured. Triggered ROLLBACK';
                        ROLLBACK;
                    END;
                
                START TRANSACTION;

                    -- Set booked_seat set as completed
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
                    INNER JOIN booked_seat as bk on bkset.Booking_Ref_ID = bk.Booking_Set
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
        cursor.execute(create_complete_booking_set_query)
        #----------------------------------

        #------- Create create booking set procedure -------
        
        create_create_booking_set_query = """
            CREATE PROCEDURE CreateBookingSet(
                IN refID CHAR(12), 
                IN scheduled_flight_id INTEGER, 
                IN acc_username VARCHAR(30), 
                IN travel_class VARCHAR(10), 
                IN booking_count SMALLINT, 
                IN finalPrice DECIMAL(8,2), 
                OUT status_var BOOLEAN)

            BEGIN
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
                
                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SQLError occured. Triggered ROLLBACK';
                    ROLLBACK;
                END;
                
                SET status_var = FALSE;

                START TRANSACTION;
                
                    IF acc_username = 'NULL' THEN
                        SET acc_username = NULL;
                    END IF;
                    
                    SELECT bprc.Price_ID INTO basePricePerBooking
                    FROM scheduled_flight AS shf
                    INNER JOIN route AS rut ON shf.Route = rut.Route_ID
                    INNER JOIN base_price AS bprc ON rut.Route_ID = bprc.Route
                    INNER JOIN class AS cls ON bprc.Class = cls.Class_Name
                    WHERE shf.Scheduled_ID = scheduled_flight_id AND cls.Class_Name = travel_class;
                    
                    INSERT INTO booking_set (Booking_Ref_ID, Scheduled_Flight, User, BPrice_Per_Booking, Final_price) 
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
                            INNER JOIN booking AS bkset ON bk.booking = bkset.Booking_Ref_ID
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
                        
                        INSERT INTO booked_seat (booking, Seat_Number, FirstName, LastName, IsAdult, Passport_ID) 
                        VALUES (refID, seat_number, first_name, last_name, is_adult, passportid);
                        
                    END LOOP;
                    CLOSE recordsCursor;
                
                COMMIT;
                SET status_var = TRUE;
            END;
        """
        cursor.execute(create_create_booking_set_query)
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
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create views")


