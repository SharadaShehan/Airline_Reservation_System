from app.scripts.db import get_db_connection
from flask import current_app


def drop_all_tables():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_table_queries = []
        tables_list = [
            "booking",
            "booking_set",
            "user",
            "category",
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
            FOREIGN KEY (Model) REFERENCES model(Model_ID) );
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
            FOREIGN KEY (Airport) REFERENCES Airport(ICAO_Code) ON DELETE CASCADE );
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
            FOREIGN KEY (Origin) REFERENCES airport(ICAO_Code),
            FOREIGN KEY (Destination) REFERENCES airport(ICAO_Code),
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
            FOREIGN KEY (Route) REFERENCES route(Route_ID),
            FOREIGN KEY (Airplane) REFERENCES airplane(Tail_Number) );
        """
        cursor.execute(create_scheduled_flight_table_query)
        #----------------------------------

        #------- Create class table -------
        create_class_table_query = """
            CREATE TABLE IF NOT EXISTS class (
            Class_Name VARCHAR(10) PRIMARY KEY,
            Class_Code CHAR(1) NOT NULL );
        """
        cursor.execute(create_class_table_query)
        #----------------------------------

        #------- Create capacity table ----
        create_capacity_table_query = """
            CREATE TABLE IF NOT EXISTS capacity (
            Capacity_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Model SMALLINT NOT NULL,
            Class VARCHAR(10) NOT NULL,
            Seats_Count SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES model(Model_ID) ON DELETE CASCADE,
            FOREIGN KEY (Class) REFERENCES class(Class_Name) );
        """
        cursor.execute(create_capacity_table_query)
        #----------------------------------

        #------- Create base price table ----
        create_base_price_table_query = """
            CREATE TABLE IF NOT EXISTS base_price (
            Price_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Class VARCHAR(10) NOT NULL,
            Route SMALLINT NOT NULL,
            Price DECIMAL(8,2) NOT NULL,
            FOREIGN KEY (Class) REFERENCES class(Class_Name),
            FOREIGN KEY (Route) REFERENCES route(Route_ID) );
        """
        cursor.execute(create_base_price_table_query)
        #----------------------------------

        #------- Create category table ----
        create_category_table_query = """
            CREATE TABLE IF NOT EXISTS category (
            Category_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Category_Name VARCHAR(10),
            Min_Bookings SMALLINT NOT NULL, 
            Discount DECIMAL(5,4) NOT NULL );
        """
        cursor.execute(create_category_table_query)
        #----------------------------------

        #------- Create user table ----
        create_user_table_query = """
            CREATE TABLE IF NOT EXISTS user (
            Username VARCHAR(30) PRIMARY KEY,
            Password CHAR(162) NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdmin BOOLEAN NOT NULL,
            IsDataEntryOperator BOOLEAN NOT NULL,
            Category SMALLINT NOT NULL DEFAULT 1,
            FOREIGN KEY (Category) REFERENCES category(Category_ID) );
        """
        cursor.execute(create_user_table_query)
        #----------------------------------

        #------- Create booking set table ----
        create_booking_set_table_query = """
            CREATE TABLE IF NOT EXISTS booking_set (
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
        """
        cursor.execute(create_booking_set_table_query)
        #----------------------------------

        #------- Create booking table ----
        create_booking_table_query = """
            CREATE TABLE IF NOT EXISTS booking (
            Ticket_Number INTEGER PRIMARY KEY AUTO_INCREMENT,
            Booking_Set CHAR(12) NOT NULL,
            Seat_Number SMALLINT NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdult BOOLEAN NOT NULL,
            FOREIGN KEY (Booking_Set) REFERENCES booking_set(Booking_Ref_ID) ON DELETE CASCADE);
        """
        cursor.execute(create_booking_table_query)
        #----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create tables")




