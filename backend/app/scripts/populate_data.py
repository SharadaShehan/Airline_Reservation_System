from app.scripts.db import get_db_connection
import csv

# populate users table
def populate_user_data():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        # Insert query for users table
        insert_users_query = """INSERT INTO users (id, username, email) VALUES"""
        # Read data from csv file and insert into users table
        with open('app/scripts/data/users_data.csv', 'r') as file:       # use specific path to csv file
            csv_reader = csv.reader(file)
            # Skip the header row
            header_row = next(csv_reader)
            for row in csv_reader:
                # Get attributes for each record from comma separated row
                id, username, email = row
                insert_users_query += f"({id},{username},{email}),"
            insert_users_query = insert_users_query[:-1] + ';'      # remove last comma and add semicolon
        cursor.execute(insert_users_query)
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to populate users data")




# Add more functions to populate data for other tables
def populate_data():
    populate_user_data()
