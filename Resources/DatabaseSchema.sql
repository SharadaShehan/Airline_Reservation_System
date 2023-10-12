DROP DATABASE IF EXISTS `airline`;

CREATE DATABASE `airline`;

USE `airline`;

SET @@session.time_zone='+05:30';

--tables..................

CREATE TABLE IF NOT EXISTS model (
            Model_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(40) NOT NULL UNIQUE);

CREATE TABLE IF NOT EXISTS airplane (
            Tail_Number VARCHAR(10) PRIMARY KEY,
            Model SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES model(Model_ID) );

CREATE TABLE IF NOT EXISTS airport (
            ICAO_Code CHAR(4) PRIMARY KEY,
            IATA_Code CHAR(3) NOT NULL );

CREATE TABLE IF NOT EXISTS location (
            Airport CHAR(4),
            Level SMALLINT,
            Name VARCHAR(20) NOT NULL,
            PRIMARY KEY (Airport, Level),
            FOREIGN KEY (Airport) REFERENCES airport(ICAO_Code) ON DELETE CASCADE );

CREATE TABLE IF NOT EXISTS route (
            Route_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Origin CHAR(4) NOT NULL,
            Destination CHAR(4) NOT NULL,
            Duration_Minutes SMALLINT NOT NULL,
            FOREIGN KEY (Origin) REFERENCES airport(ICAO_Code),
            FOREIGN KEY (Destination) REFERENCES airport(ICAO_Code),
            CONSTRAINT Unique_Route_Pair UNIQUE (Origin, Destination) );

CREATE TABLE IF NOT EXISTS scheduled_flight (
            Scheduled_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            Route SMALLINT NOT NULL,
            Airplane VARCHAR(10) NOT NULL,
            Departure_Time DATETIME NOT NULL,
            Delay_Minutes SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY (Route) REFERENCES route(Route_ID),
            FOREIGN KEY (Airplane) REFERENCES airplane(Tail_Number) );

CREATE TABLE IF NOT EXISTS class (
            Class_Name VARCHAR(10) PRIMARY KEY,
            Class_Code CHAR(1) NOT NULL );

CREATE TABLE IF NOT EXISTS capacity (
            Capacity_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Model SMALLINT NOT NULL,
            Class VARCHAR(10) NOT NULL,
            Seats_Count SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES model(Model_ID) ON DELETE CASCADE,
            FOREIGN KEY (Class) REFERENCES class(Class_Name) );

CREATE TABLE IF NOT EXISTS base_price (
            Price_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Class VARCHAR(10) NOT NULL,
            Route SMALLINT NOT NULL,
            Price DECIMAL(8,2) NOT NULL,
            FOREIGN KEY (Class) REFERENCES class(Class_Name),
            FOREIGN KEY (Route) REFERENCES route(Route_ID) );

CREATE TABLE IF NOT EXISTS user_category (
            Category_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Category_Name VARCHAR(10),
            Min_Bookings SMALLINT NOT NULL, 
            Discount DECIMAL(5,4) NOT NULL );

CREATE TABLE IF NOT EXISTS user (
            Username VARCHAR(30) PRIMARY KEY,
            Password CHAR(162) NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL);

CREATE TABLE IF NOT EXISTS registered_user (
            Username VARCHAR(30) PRIMARY KEY,
            Passport_ID VARCHAR(15) NOT NULL,
            Address VARCHAR(50) NOT NULL,
            Category SMALLINT NOT NULL DEFAULT 1,
            Birth_Date DATE NOT NULL,
            Gender VARCHAR(15) NOT NULL,
            Email VARCHAR(50) NOT NULL,
            Contact_Number VARCHAR(16) NOT NULL,
            Bookings_Count SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY (Category) REFERENCES user_category(Category_ID),
            FOREIGN KEY (Username) REFERENCES user(Username) );

CREATE TABLE IF NOT EXISTS staff (
            Username VARCHAR(30) PRIMARY KEY,
            Role VARCHAR(20) NOT NULL,
            FOREIGN KEY (Username) REFERENCES user(Username) );

CREATE TABLE IF NOT EXISTS booking (
            Booking_Ref_ID CHAR(12) PRIMARY KEY ,
            Scheduled_Flight INTEGER NOT NULL,
            User VARCHAR(30),
            BPrice_Per_Booking SMALLINT NOT NULL,
            Final_Price DECIMAL(8,2) NOT NULL,
            Completed BOOLEAN NOT NULL DEFAULT 0,
            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (Scheduled_Flight) REFERENCES scheduled_flight(Scheduled_ID),
            FOREIGN KEY (User) REFERENCES user(Username),
            FOREIGN KEY (BPrice_Per_Booking) REFERENCES base_price(Price_ID) );

CREATE TABLE IF NOT EXISTS booked_seat (
            Ticket_Number INTEGER PRIMARY KEY AUTO_INCREMENT,
            Booking CHAR(12) NOT NULL,
            Seat_Number SMALLINT NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdult BOOLEAN NOT NULL,
            Passport_ID VARCHAR(15) NOT NULL,
            FOREIGN KEY (Booking) REFERENCES booking(Booking_Ref_ID) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS guest (
            Guest_ID CHAR(12) PRIMARY KEY,
            Booking_Ref_ID CHAR(12) NOT NULL,
            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            Email VARCHAR(50),
            Contact_Number VARCHAR(16),
            FOREIGN KEY (Booking_Ref_ID) REFERENCES booking(Booking_Ref_ID) ON DELETE CASCADE);
 --functions...............

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


--views............

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


--events.............

CREATE EVENT CheckBookingValidity
            ON SCHEDULE EVERY 60 MINUTE STARTS CURRENT_TIMESTAMP
            DO
            BEGIN
            DELETE FROM booking
            WHERE 
                Created_At < NOW() - INTERVAL 300 MINUTE
                AND User IS NULL
                AND Completed = 0;
            END;

--procedures..........



#------- Create complete booking procedure -------
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

                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                    BEGIN
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SQLError occured. Triggered ROLLBACK';
                        ROLLBACK;
                    END;
                
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

#------- Create create booking procedure -------
CREATE PROCEDURE CreateBooking(
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
                DECLARE guest_id CHAR(12);
                
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

                    IF acc_username IS NULL THEN
                        SET guest_id = GenerateRandomGuestID();
                        INSERT INTO guest (Guest_ID, Booking_Ref_ID) 
                        VALUES (guest_id, refID);
                    END IF;

                COMMIT;
                SET status_var = TRUE;
            END;

#------- Create schedule flight procedure -------

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






