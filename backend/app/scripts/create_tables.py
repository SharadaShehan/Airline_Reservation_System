from app.scripts.db import get_db_connection


def drop_all_tables():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_table_queries = []
        tables_list = [
            "guest",
            "booked_seat",
            "booking",
            "staff",
            "registered_user",
            "user",
            "user_category",
            "base_price",
            "capacity",
            "class",
            "scheduled_flight",
            "route",
            "location",
            "airport",
            "airplane",
            "model"
        ]
        
        # Generate drop queries for all tables and append to drop_queries list
        for table_name in tables_list:
            drop_table_queries.append(f"DROP TABLE IF EXISTS {table_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_table_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_tables():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create model table -------
        create_model_table_query = """
            CREATE TABLE IF NOT EXISTS model (
            Model_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(40) NOT NULL UNIQUE);
        """
        cursor.execute(create_model_table_query)
        #----------------------------------

        #------- Create airplane table ----
        create_airplane_table_query = """
            CREATE TABLE IF NOT EXISTS airplane (
            Tail_Number VARCHAR(10) PRIMARY KEY,
            Model SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES model(Model_ID) ON DELETE CASCADE );
        """
        cursor.execute(create_airplane_table_query)
        #----------------------------------

        #------- Create airport table -----
        create_airport_table_query = """
            CREATE TABLE IF NOT EXISTS airport (
            ICAO_Code CHAR(4) PRIMARY KEY,
            IATA_Code CHAR(3) NOT NULL );
        """
        cursor.execute(create_airport_table_query)
        #----------------------------------

        #------- Create location table -----
        create_location_table_query = """
            CREATE TABLE IF NOT EXISTS location (
            Airport CHAR(4),
            Level SMALLINT,
            Name VARCHAR(20) NOT NULL,
            PRIMARY KEY (Airport, Level),
            FOREIGN KEY (Airport) REFERENCES airport(ICAO_Code) ON DELETE CASCADE );
        """
        cursor.execute(create_location_table_query)
        #----------------------------------

        #------- Create route table ------
        create_route_table_query = """
            CREATE TABLE IF NOT EXISTS route (
            Route_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Origin CHAR(4) NOT NULL,
            Destination CHAR(4) NOT NULL,
            Duration_Minutes SMALLINT NOT NULL,
            FOREIGN KEY (Origin) REFERENCES airport(ICAO_Code) ON DELETE CASCADE,
            FOREIGN KEY (Destination) REFERENCES airport(ICAO_Code) ON DELETE CASCADE,
            CONSTRAINT Unique_Route_Pair UNIQUE (Origin, Destination) );
        """
        cursor.execute(create_route_table_query)
        #----------------------------------

        #------- Create scheduled flight table ----
        create_scheduled_flight_table_query = """
            CREATE TABLE IF NOT EXISTS scheduled_flight (
            Scheduled_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            Route SMALLINT NOT NULL,
            Airplane VARCHAR(10) NOT NULL,
            Departure_Time DATETIME NOT NULL,
            Delay_Minutes SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY (Route) REFERENCES route(Route_ID) ON DELETE CASCADE,
            FOREIGN KEY (Airplane) REFERENCES airplane(Tail_Number) ON DELETE CASCADE );
        """
        cursor.execute(create_scheduled_flight_table_query)
        #----------------------------------

        #------- Create class table -------
        create_class_table_query = """
            CREATE TABLE IF NOT EXISTS class (
            Class_Name ENUM('Economy', 'Business', 'Platinum') PRIMARY KEY,
            Class_Code CHAR(1) NOT NULL );
        """
        cursor.execute(create_class_table_query)
        #----------------------------------

        #------- Create capacity table ----
        create_capacity_table_query = """
            CREATE TABLE IF NOT EXISTS capacity (
            Capacity_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Model SMALLINT NOT NULL,
            Class ENUM('Economy', 'Business', 'Platinum') NOT NULL,
            Seats_Count SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES model(Model_ID) ON DELETE CASCADE,
            FOREIGN KEY (Class) REFERENCES class(Class_Name) ON DELETE CASCADE );
        """
        cursor.execute(create_capacity_table_query)
        #----------------------------------

        #------- Create base price table ----
        create_base_price_table_query = """
            CREATE TABLE IF NOT EXISTS base_price (
            Price_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Class ENUM('Economy', 'Business', 'Platinum') NOT NULL,
            Route SMALLINT NOT NULL,
            Price DECIMAL(8,2) NOT NULL,
            FOREIGN KEY (Class) REFERENCES class(Class_Name) ON DELETE CASCADE,
            FOREIGN KEY (Route) REFERENCES route(Route_ID) ON DELETE CASCADE,
            CONSTRAINT Unique_Price_Pair UNIQUE (Class, Route) );
        """
        cursor.execute(create_base_price_table_query)
        #----------------------------------

        #------- Create category table ----
        create_user_category_table_query = """
            CREATE TABLE IF NOT EXISTS user_category (
            Category_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Category_Name ENUM('General', 'Frequent', 'Gold') NOT NULL,
            Min_Bookings SMALLINT NOT NULL, 
            Discount DECIMAL(5,4) NOT NULL );
        """
        cursor.execute(create_user_category_table_query)
        #----------------------------------

        #------- Create user table ----
        create_user_table_query = """
            CREATE TABLE IF NOT EXISTS user (
            Username VARCHAR(30) PRIMARY KEY,
            Password CHAR(162) NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL);
        """
        cursor.execute(create_user_table_query)
        #----------------------------------

        #------- Create registered user table ----
        create_registered_user_table_query = """
            CREATE TABLE IF NOT EXISTS registered_user (
            Username VARCHAR(30) PRIMARY KEY,
            Passport_ID VARCHAR(15) NOT NULL,
            Address VARCHAR(50) NOT NULL,
            Category SMALLINT NOT NULL DEFAULT 1,
            Birth_Date DATE NOT NULL,
            Gender VARCHAR(15) NOT NULL,
            Email VARCHAR(50) NOT NULL,
            Contact_Number VARCHAR(16) NOT NULL UNIQUE,
            Bookings_Count SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY (Category) REFERENCES user_category(Category_ID) ON DELETE CASCADE,
            FOREIGN KEY (Username) REFERENCES user(Username) ON DELETE CASCADE);
        """
        cursor.execute(create_registered_user_table_query)
        #----------------------------------

        #------- Create staff table ----
        create_staff_table_query = """
            CREATE TABLE IF NOT EXISTS staff (
            Username VARCHAR(30) PRIMARY KEY,
            Role ENUM('Admin', 'Data Entry Operator') NOT NULL,
            FOREIGN KEY (Username) REFERENCES user(Username) ON DELETE CASCADE );
        """
        cursor.execute(create_staff_table_query)
        #----------------------------------

        #------- Create booking table ----
        create_booking_table_query = """
            CREATE TABLE IF NOT EXISTS booking (
            Booking_Ref_ID CHAR(12) PRIMARY KEY ,
            Scheduled_Flight INTEGER NOT NULL,
            User VARCHAR(30),
            BPrice_Per_Booking SMALLINT NOT NULL,
            Final_Price DECIMAL(8,2) NOT NULL,
            Completed BOOLEAN NOT NULL DEFAULT 0,
            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (Scheduled_Flight) REFERENCES scheduled_flight(Scheduled_ID) ON DELETE CASCADE,
            FOREIGN KEY (User) REFERENCES user(Username) ON DELETE CASCADE,
            FOREIGN KEY (BPrice_Per_Booking) REFERENCES base_price(Price_ID) ON DELETE CASCADE );
        """
        cursor.execute(create_booking_table_query)
        #----------------------------------

        #------- Create booked_seat table ----
        create_booked_seat_table_query = """
            CREATE TABLE IF NOT EXISTS booked_seat (
            Ticket_Number INTEGER PRIMARY KEY AUTO_INCREMENT,
            Booking CHAR(12) NOT NULL,
            Seat_Number SMALLINT NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdult BOOLEAN NOT NULL,
            Passport_ID VARCHAR(15) NOT NULL,
            FOREIGN KEY (Booking) REFERENCES booking(Booking_Ref_ID) ON DELETE CASCADE,
            CONSTRAINT Unique_Seat_On_Booking UNIQUE (Booking, Seat_Number) );
        """
        cursor.execute(create_booked_seat_table_query)
        #----------------------------------
        
        #------- Create guest table ----
        create_guest_table_query = """
            CREATE TABLE IF NOT EXISTS guest (
            Guest_ID CHAR(12) NOT NULL,
            Booking_Ref_ID CHAR(12) PRIMARY KEY,
            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            Email VARCHAR(50),
            Contact_Number VARCHAR(16),
            FOREIGN KEY (Booking_Ref_ID) REFERENCES booking(Booking_Ref_ID) ON DELETE CASCADE);
        """
        cursor.execute(create_guest_table_query)
        #----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create tables")




