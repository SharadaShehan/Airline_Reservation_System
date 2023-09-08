from app.scripts.db import get_db_connection
from flask import current_app


def drop_all_tables():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_table_queries = []
        # Get all table names from the database
        tables_list = [
            "Booking",
            "Booking_Set",
            "User",
            "Category",
            "Base_Price",
            "Capacity",
            "Class",
            "Scheduled_Flight",
            "Route",
            "Location",
            "Airport",
            "Airplane",
            "Model"
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
            CREATE TABLE IF NOT EXISTS Model (
            Model_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(40) NOT NULL );
        """
        cursor.execute(create_model_table_query)
        #----------------------------------

        #------- Create airplane table ----
        create_airplane_table_query = """
            CREATE TABLE IF NOT EXISTS Airplane (
            Tail_Number VARCHAR(10) PRIMARY KEY,
            Model SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES Model(Model_ID) );
        """
        cursor.execute(create_airplane_table_query)
        #----------------------------------

        #------- Create airport table -----
        create_airport_table_query = """
            CREATE TABLE IF NOT EXISTS Airport (
            ICAO_Code CHAR(4) PRIMARY KEY,
            IATA_Code CHAR(3) NOT NULL );
        """
        cursor.execute(create_airport_table_query)
        #----------------------------------

        #------- Create location table -----
        create_location_table_query = """
            CREATE TABLE IF NOT EXISTS Location (
            Airport CHAR(4),
            Level SMALLINT,
            Name VARCHAR(20) NOT NULL,
            PRIMARY KEY (Airport, Level),
            FOREIGN KEY (Airport) REFERENCES Airport(ICAO_Code) );
        """
        cursor.execute(create_location_table_query)
        #----------------------------------

        #------- Create route table ------
        create_route_table_query = """
            CREATE TABLE IF NOT EXISTS Route (
            Route_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Origin CHAR(4) NOT NULL,
            Destination CHAR(4) NOT NULL,
            Duration_Minutes SMALLINT NOT NULL,
            FOREIGN KEY (Origin) REFERENCES Airport(ICAO_Code),
            FOREIGN KEY (Destination) REFERENCES Airport(ICAO_Code) );
        """
        cursor.execute(create_route_table_query)
        #----------------------------------

        #------- Create scheduled flight table ----
        create_scheduled_flight_table_query = """
            CREATE TABLE IF NOT EXISTS Scheduled_Flight (
            Scheculed_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
            Route SMALLINT NOT NULL,
            Airplane VARCHAR(10) NOT NULL,
            Departure_Time DATETIME NOT NULL,
            Delay_Minutes SMALLINT NOT NULL,
            FOREIGN KEY (Route) REFERENCES Route(Route_ID),
            FOREIGN KEY (Airplane) REFERENCES Airplane(Tail_Number) );
        """
        cursor.execute(create_scheduled_flight_table_query)
        #----------------------------------

        #------- Create class table -------
        create_class_table_query = """
            CREATE TABLE IF NOT EXISTS Class (
            Class_Name VARCHAR(10) PRIMARY KEY,
            Class_Code CHAR(1) NOT NULL );
        """
        cursor.execute(create_class_table_query)
        #----------------------------------

        #------- Create capacity table ----
        create_capacity_table_query = """
            CREATE TABLE IF NOT EXISTS Capacity (
            Capacity_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Model SMALLINT NOT NULL,
            Class VARCHAR(10) NOT NULL,
            Seats_Count SMALLINT NOT NULL,
            FOREIGN KEY (Model) REFERENCES Model(Model_ID),
            FOREIGN KEY (Class) REFERENCES Class(Class_Name) );
        """
        cursor.execute(create_capacity_table_query)
        #----------------------------------

        #------- Create base price table ----
        create_base_price_table_query = """
            CREATE TABLE IF NOT EXISTS Base_Price (
            Price_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Class VARCHAR(10) NOT NULL,
            Route SMALLINT NOT NULL,
            Price DECIMAL(8,2) NOT NULL,
            FOREIGN KEY (Class) REFERENCES Class(Class_Name),
            FOREIGN KEY (Route) REFERENCES Route(Route_ID) );
        """
        cursor.execute(create_base_price_table_query)
        #----------------------------------

        #------- Create category table ----
        create_category_table_query = """
            CREATE TABLE IF NOT EXISTS Category (
            Category_ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
            Category_Name VARCHAR(10),
            Min_Bookings SMALLINT NOT NULL, 
            Discount DECIMAL(5,4) NOT NULL );
        """
        cursor.execute(create_category_table_query)
        #----------------------------------

        #------- Create user table ----
        create_user_table_query = """
            CREATE TABLE IF NOT EXISTS User (
            Username VARCHAR(30) PRIMARY KEY,
            Password CHAR(162) NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdmin BOOLEAN NOT NULL,
            IsDataEntryOperator BOOLEAN NOT NULL,
            Bookings_Count SMALLINT NOT NULL,
            Category SMALLINT NOT NULL,
            FOREIGN KEY (Category) REFERENCES Category(Category_ID) );
        """
        cursor.execute(create_user_table_query)
        #----------------------------------

        #------- Create booking set table ----
        create_booking_set_table_query = """
            CREATE TABLE IF NOT EXISTS Booking_Set (
            Booking_Ref_ID CHAR(12) PRIMARY KEY ,
            Scheduled_Flight INTEGER NOT NULL,
            User VARCHAR(30),
            BPrice_Per_Booking SMALLINT NOT NULL,
            Final_Price DECIMAL(8,2) NOT NULL,
            Completed BOOLEAN NOT NULL,
            FOREIGN KEY (Scheduled_Flight) REFERENCES Scheduled_Flight(Scheculed_ID),
            FOREIGN KEY (User) REFERENCES User(Username),
            FOREIGN KEY (BPrice_Per_Booking) REFERENCES Base_Price(Price_ID) );
        """
        cursor.execute(create_booking_set_table_query)
        #----------------------------------

        #------- Create booking table ----
        create_booking_table_query = """
            CREATE TABLE IF NOT EXISTS Booking (
            Ticket_Number INTEGER PRIMARY KEY AUTO_INCREMENT,
            Booking_Set CHAR(12) NOT NULL,
            Seat_Number SMALLINT NOT NULL,
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            IsAdult BOOLEAN NOT NULL,
            FOREIGN KEY (Booking_Set) REFERENCES Booking_Set(Booking_Ref_ID) );
        """
        cursor.execute(create_booking_table_query)
        #----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create tables")




