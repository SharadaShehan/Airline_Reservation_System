from app.scripts.db import get_db_connection
import csv


def populate_user_data():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        insert_users_query = """INSERT INTO users (id, username, email) VALUES\n\t"""
        with open('app/scripts/users_data.csv', 'r') as file:
            csv_reader = csv.reader(file)
            # Skip the header row
            header = next(csv_reader)
            for row in csv_reader:
                id, username, email = row
                insert_users_query += f"({id},{username},{email}),\n\t"
            insert_users_query = insert_users_query[:-3] + ';'
            print(insert_users_query)
        cursor.execute(insert_users_query)
        connection.commit()
        connection.close()
    else:
        print("Falied to populate data")



def populate_data():
    populate_user_data()
