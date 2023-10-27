from app.scripts.db import get_db_connection


def drop_all_triggers():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_trigger_queries = []
        triggers_list = [
            "check_routes_matching",
            "check_booking_has_seats_and_guest",
            "check_valid_route_creation",
            "check_airport_has_locations",
            "check_flight_has_paid_bookings",
            "check_airport_has_paid_bookings",
            "check_airplane_has_paid_bookings",
            "check_model_has_paid_bookings",
            "check_route_has_paid_bookings"
        ]
        
        # Generate drop queries for all triggers and append to drop_queries list
        for trigger_name in triggers_list:
            drop_trigger_queries.append(f"DROP TRIGGER IF EXISTS {trigger_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_trigger_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_triggers():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create check routes matching trigger -------

        create_check_routes_matching_trigger_query = """
            CREATE TRIGGER check_routes_matching
                BEFORE INSERT ON booking
                FOR EACH ROW
                BEGIN
                    DECLARE route_of_base_price SMALLINT;
                    DECLARE route_of_scheduled_flight SMALLINT;

                    SELECT Route INTO route_of_base_price
                    FROM base_price
                    WHERE Price_ID = NEW.BPrice_Per_Booking;

                    SELECT Route INTO route_of_scheduled_flight
                    FROM scheduled_flight
                    WHERE Scheduled_ID = NEW.Scheduled_Flight;

                    IF route_of_base_price != route_of_scheduled_flight THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Route of base price and scheduled flight do not match';
                    END IF;
                END;
        """
        cursor.execute(create_check_routes_matching_trigger_query)
        #--------------------------------------------------

        #------- Create check booking comprises seats and guest trigger -------

        create_check_booking_has_seats_and_guest_trigger_query = """
            CREATE TRIGGER check_booking_has_seats_and_guest
                BEFORE UPDATE ON booking
                FOR EACH ROW
                BEGIN
                    DECLARE booked_seats_count SMALLINT;
                    DECLARE guest_user_id CHAR(12);

                    SELECT COUNT(*) INTO booked_seats_count
                    FROM booked_seat
                    WHERE Booking = NEW.Booking_Ref_ID;

                    IF booked_seats_count = 0 THEN
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking must have at least 1 seat';
                    END IF;

                    IF NEW.User IS NULL THEN
                        SELECT Guest_ID INTO guest_user_id
                        FROM guest
                        WHERE Booking_Ref_ID = NEW.Booking_Ref_ID;

                        IF guest_user_id IS NULL THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Booking with no user';
                        END IF;
                    END IF;
                END;
        """
        cursor.execute(create_check_booking_has_seats_and_guest_trigger_query)
        #--------------------------------------------------

        #------- Create check valid route creation trigger -------

        create_check_valid_route_creation_trigger_query = """
            CREATE TRIGGER check_valid_route_creation
                BEFORE INSERT ON route
                FOR EACH ROW
                BEGIN
                    IF NEW.Origin = NEW.Destination THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Origin and destination must be different';
                    END IF;
                END;
        
        """
        cursor.execute(create_check_valid_route_creation_trigger_query)
        #--------------------------------------------------

        #------- Create check airport has locations trigger -------

        create_check_airport_has_locations_trigger_query = """
            CREATE TRIGGER check_airport_has_locations
                AFTER INSERT ON location
                FOR EACH ROW
                BEGIN
                    DECLARE airport_count SMALLINT;
                    DECLARE airport_code CHAR(4);
                    DECLARE airport_cursor CURSOR FOR SELECT ICAO_Code FROM airport;
                    DECLARE CONTINUE HANDLER FOR NOT FOUND SET airport_count = 0;

                    OPEN airport_cursor;
                    airport_loop: LOOP
                        FETCH airport_cursor INTO airport_code;
                        IF airport_count = 0 THEN
                            LEAVE airport_loop;
                        END IF;
                        IF airport_code NOT IN (SELECT Airport FROM location) THEN
                            DELETE FROM airport WHERE ICAO_Code = airport_code;
                        END IF;
                    END LOOP airport_loop;
                    CLOSE airport_cursor;
                END;
        """
        cursor.execute(create_check_airport_has_locations_trigger_query)
        #--------------------------------------------------

        #------- Create check flight has paid bookings trigger -------

        create_check_flight_has_paid_bookings_trigger_query = """
            CREATE TRIGGER check_flight_has_paid_bookings
                BEFORE DELETE ON scheduled_flight
                FOR EACH ROW
                BEGIN
                    DECLARE paid_bookings_count SMALLINT;

                    SELECT COUNT(*) INTO paid_bookings_count
                    FROM booking
                    WHERE Scheduled_Flight = OLD.Scheduled_ID AND Completed = 1;

                    IF paid_bookings_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Flight has paid bookings, cannot delete';
                    END IF;
                END;
        """
        cursor.execute(create_check_flight_has_paid_bookings_trigger_query)
        #--------------------------------------------------

        #------- Create check airport has paid bookings trigger -------

        create_check_airport_has_paid_bookings_trigger_query = """
            CREATE TRIGGER check_airport_has_paid_bookings
                BEFORE DELETE ON airport
                FOR EACH ROW
                BEGIN
                    DECLARE paid_bookings_count SMALLINT;

                    SELECT COUNT(*) INTO paid_bookings_count
                    FROM booking as bk
                    INNER JOIN scheduled_flight as sf ON bk.Scheduled_Flight = sf.Scheduled_ID
                    INNER JOIN route as rt ON sf.Route = rt.Route_ID
                    WHERE rt.Origin = OLD.ICAO_Code OR rt.Destination = OLD.ICAO_Code AND bk.Completed = 1;

                    IF paid_bookings_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Airport has paid bookings, cannot delete';
                    END IF;
                END;
        """
        cursor.execute(create_check_airport_has_paid_bookings_trigger_query)
        #--------------------------------------------------

        #------- Create check airplane has paid bookings trigger -------

        create_check_airplane_has_paid_bookings_trigger_query = """
            CREATE TRIGGER check_airplane_has_paid_bookings
                BEFORE DELETE ON airplane
                FOR EACH ROW
                BEGIN
                    DECLARE paid_bookings_count SMALLINT;

                    SELECT COUNT(*) INTO paid_bookings_count
                    FROM booking as bk
                    INNER JOIN scheduled_flight as sf ON bk.Scheduled_Flight = sf.Scheduled_ID
                    WHERE sf.Airplane = OLD.Tail_Number AND bk.Completed = 1;

                    IF paid_bookings_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Airplane has paid bookings, cannot delete';
                    END IF;
                END;
        """
        cursor.execute(create_check_airplane_has_paid_bookings_trigger_query)
        #--------------------------------------------------

        #------- Create check model has paid bookings trigger -------

        create_check_model_has_paid_bookings_trigger_query = """
            CREATE TRIGGER check_model_has_paid_bookings
                BEFORE DELETE ON model
                FOR EACH ROW
                BEGIN
                    DECLARE paid_bookings_count SMALLINT;

                    SELECT COUNT(*) INTO paid_bookings_count
                    FROM booking as bk
                    INNER JOIN scheduled_flight as sf ON bk.Scheduled_Flight = sf.Scheduled_ID
                    INNER JOIN airplane as ap ON sf.Airplane = ap.Tail_Number
                    WHERE ap.Model = OLD.Model_ID AND bk.Completed = 1;

                    IF paid_bookings_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Model has paid bookings, cannot delete';
                    END IF;
                END;
        """
        cursor.execute(create_check_model_has_paid_bookings_trigger_query)
        #--------------------------------------------------

        #------- Create check route has paid bookings trigger -------

        create_check_route_has_paid_bookings_trigger_query = """
            CREATE TRIGGER check_route_has_paid_bookings
                BEFORE DELETE ON route
                FOR EACH ROW
                BEGIN
                    DECLARE paid_bookings_count SMALLINT;

                    SELECT COUNT(*) INTO paid_bookings_count
                    FROM booking as bk
                    INNER JOIN scheduled_flight as sf ON bk.Scheduled_Flight = sf.Scheduled_ID
                    WHERE sf.Route = OLD.Route_ID AND bk.Completed = 1;

                    IF paid_bookings_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                            SET MESSAGE_TEXT = 'Route has paid bookings, cannot delete';
                    END IF;
                END;
        """
        cursor.execute(create_check_route_has_paid_bookings_trigger_query)
        #--------------------------------------------------

        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create triggers")

