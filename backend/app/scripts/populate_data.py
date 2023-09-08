from app.scripts.db import get_db_connection
import csv
from werkzeug.security import generate_password_hash

def populate_model_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_model_query = """INSERT INTO Model (Name) VALUES"""
        # Read data from csv file and insert into Model table
        with open('app/scripts/data/Model.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                name = row[0]
                insert_model_query += f"({name}),"
            insert_model_query = insert_model_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_model_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate model data")

def populate_airplane_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_airplane_query = """INSERT INTO Airplane (Tail_Number, Model) VALUES"""
        # Read data from csv file and insert into Airplane table
        with open('app/scripts/data/Airplane.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                tail_number, model = row
                insert_airplane_query += f"({tail_number}, {model}),"
            insert_airplane_query = insert_airplane_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_airplane_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate airplane data")
    
def populate_airport_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_airport_query = """INSERT INTO Airport (ICAO_Code, IATA_Code) VALUES"""
        # Read data from csv file and insert into Airport table
        with open('app/scripts/data/Airport.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                icao_code, iata_code = row
                insert_airport_query += f"({icao_code}, {iata_code}),"
            insert_airport_query = insert_airport_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_airport_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate airport data")

def populate_location_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_location_query = """INSERT INTO Location (Airport, Level, Name) VALUES"""
        # Read data from csv file and insert into Location table
        with open('app/scripts/data/Location.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                airport, level, name = row
                insert_location_query += f"({airport}, {level}, {name}),"
            insert_location_query = insert_location_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_location_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate location data")

def populate_route_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_route_query = """INSERT INTO Route (Origin, Destination, Duration_Minutes) VALUES"""
        # Read data from csv file and insert into Route table
        with open('app/scripts/data/Route.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                origin, destination, duration_minutes = row
                insert_route_query += f"({origin}, {destination}, {duration_minutes}),"
            insert_route_query = insert_route_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_route_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate route data")

def populate_scheduled_flight_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_scheduled_flight_query = """INSERT INTO Scheduled_Flight (Route, Airplane, Departure_Time, Delay_Minutes) VALUES"""
        # Read data from csv file and insert into Scheduled_Flight table
        with open('app/scripts/data/Scheduled_Flight.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                route, airplane, departure_time = row
                insert_scheduled_flight_query += f"({route}, {airplane}, {departure_time}, 0),"
            insert_scheduled_flight_query = insert_scheduled_flight_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_scheduled_flight_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate scheduled flight data")

def populate_class_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_class_query = """INSERT INTO Class (Class_Name, Class_Code) VALUES"""
        # Read data from csv file and insert into Class table
        with open('app/scripts/data/Class.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                class_name, class_code = row
                insert_class_query += f"({class_name}, {class_code}),"
            insert_class_query = insert_class_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_class_query)
        connection.commit()
        connection.close()

def populate_capacity_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_capacity_query = """INSERT INTO Capacity (Model, Class, Seats_Count) VALUES"""
        # Read data from csv file and insert into Capacity table
        with open('app/scripts/data/Capacity.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                model, class_name, seats_count = row
                insert_capacity_query += f"({model}, {class_name}, {seats_count}),"
            insert_capacity_query = insert_capacity_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_capacity_query)
        connection.commit()
        connection.close()

def populate_base_price_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_base_price_query = """INSERT INTO Base_Price (Class, Route, Price) VALUES"""
        # Read data from csv file and insert into Base_Price table
        with open('app/scripts/data/Base_Price.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                class_name, route, price = row
                insert_base_price_query += f"({class_name}, {route}, {price}),"
            insert_base_price_query = insert_base_price_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_base_price_query)
        connection.commit()
        connection.close()

def populate_category_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_category_query = """INSERT INTO Category (Category_Name, Min_Bookings, Discount) VALUES"""
        # Read data from csv file and insert into Category table
        with open('app/scripts/data/Category.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                category_name, min_bookings, discount = row
                insert_category_query += f"({category_name}, {min_bookings}, {discount}),"
            insert_category_query = insert_category_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_category_query)
        connection.commit()
        connection.close()

def populate_user_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_user_query = """INSERT INTO User (Username, Password, FirstName, LastName, IsAdmin, IsDataEntryOperator, Bookings_Count, Category) VALUES"""
        # Read data from csv file and insert into User table
        with open('app/scripts/data/User.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                username, password, first_name, last_name, is_admin, is_DEO, bookings_count, category = row
                hashed_password = generate_password_hash(password.strip()[1:-1], method='scrypt')
                insert_user_query += f"({username}, '{hashed_password}', {first_name}, {last_name}, {is_admin}, {is_DEO}, {bookings_count}, {category}),"
            insert_user_query = insert_user_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_user_query)
        connection.commit()
        connection.close()

def populate_booking_set_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_booking_set_query = """INSERT INTO Booking_Set (Booking_Ref_ID, Scheduled_Flight, User, BPrice_Per_Booking, Final_price, Completed) VALUES"""
        # Read data from csv file and insert into Booking_Set table
        with open('app/scripts/data/Booking_Set.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                booking_ref_id, scheduled_flight, user, bprice_per_booking, final_price, completed = row
                if user.strip() == '':
                    user = 'NULL'
                insert_booking_set_query += f"({booking_ref_id}, {scheduled_flight}, {user}, {bprice_per_booking}, {final_price}, {completed}),"
            insert_booking_set_query = insert_booking_set_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_booking_set_query)
        connection.commit()
        connection.close()

def populate_booking_table():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_booking_query = """INSERT INTO Booking (Booking_Set, Seat_Number, FirstName, LastName, IsAdult) VALUES"""
        # Read data from csv file and insert into Booking table
        with open('app/scripts/data/Booking.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                booking_set, seat_number, first_name, last_name, is_adult = row
                insert_booking_query += f"({booking_set}, {seat_number}, {first_name}, {last_name}, {is_adult}),"
            insert_booking_query = insert_booking_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_booking_query)
        connection.commit()
        connection.close()

# Add more functions to populate data for other tables
def populate_data():
    populate_model_table()
    populate_airplane_table()
    populate_airport_table()
    populate_location_table()
    populate_route_table()
    populate_scheduled_flight_table()
    populate_class_table()
    populate_capacity_table()
    populate_base_price_table()
    populate_category_table()
    populate_user_table()
    populate_booking_set_table()
    populate_booking_table()

