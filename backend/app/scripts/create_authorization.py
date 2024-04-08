from app.scripts.db import get_db_connection
from flask import current_app

def drop_all_users_roles():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_queries = []
        users_list = [
            "'adminAccount'@'%'",
            "'staffAccount'@'%'",
            "'registeredUserAccount'@'%'",
            "'guestAccount'@'%'"
        ]
        roles_list = [
            "'admin'",
            "'staff'",
            "'registeredUser'",
            "'guest'"
        ]

        # Generate drop queries for all users of the database
        for user in users_list:
            drop_queries.append(f"DROP USER IF EXISTS {user};")
        
        # Generate drop queries for all roles of the database
        for role in roles_list:
            drop_queries.append(f"DROP ROLE IF EXISTS {role};")
        
        # Execute all drop queries
        for query in drop_queries:
            cursor.execute(query)
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_and_grant_users_roles():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        database = current_app.config['MYSQL_DB']

        # Create roles
        cursor.execute("CREATE ROLE IF NOT EXISTS 'admin', 'staff', 'registeredUser', 'guest';")

        # Create users
        cursor.execute("CREATE USER IF NOT EXISTS 'adminAccount'@'%' IDENTIFIED BY 'P7tZ99pJ2s9';")
        cursor.execute("CREATE USER IF NOT EXISTS 'staffAccount'@'%' IDENTIFIED BY 'MK6dLpY9sPz';")
        cursor.execute("CREATE USER IF NOT EXISTS 'registeredUserAccount'@'%' IDENTIFIED BY '0qR3vKnX8w5';")
        cursor.execute("CREATE USER IF NOT EXISTS 'guestAccount'@'%' IDENTIFIED BY 'L2mSgV7hg5e';")

        # Grant privileges to admin role
        cursor.execute(f"GRANT ALL PRIVILEGES ON {database}.* TO 'admin';")

        # Grant privileges to staff role
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.capacity TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.model TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.airplane TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.airport TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.location TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.route TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.scheduled_flight TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.base_price TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE ON {database}.class TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.user TO 'staff';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.staff TO 'staff';")
        cursor.execute(f"GRANT SELECT ON {database}.flight TO 'staff';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.ScheduleFlight TO 'staff';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.CreateModel TO 'staff';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.CreateAirport TO 'staff';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.CreateRoute TO 'staff';")

        # Grant privileges to registeredUser role
        cursor.execute(f"GRANT SELECT ON {database}.capacity TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.model TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.airplane TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.airport TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.location TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.route TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.scheduled_flight TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.base_price TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.class TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.flight TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.ticket TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.seat_reservation TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT ON {database}.user_category TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.user TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.registered_user TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.booking TO 'registeredUser';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.booked_seat TO 'registeredUser';")
        cursor.execute(f"GRANT CREATE TEMPORARY TABLES ON {database}.* TO 'registeredUser';")
        cursor.execute(f"GRANT EXECUTE ON FUNCTION {database}.GenerateRandomString TO 'registeredUser';")
        cursor.execute(f"GRANT EXECUTE ON FUNCTION {database}.CalculateFinalPrice TO 'registeredUser';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.UserCreateBooking TO 'registeredUser';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.CompleteBooking TO 'registeredUser';")

        # Grant privileges to guest role
        cursor.execute(f"GRANT SELECT ON {database}.capacity TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.model TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.airplane TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.airport TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.location TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.route TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.scheduled_flight TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.base_price TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.class TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.flight TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.ticket TO 'guest';")
        cursor.execute(f"GRANT SELECT ON {database}.seat_reservation TO 'guest';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.guest TO 'guest';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.booking TO 'guest';")
        cursor.execute(f"GRANT SELECT, INSERT, UPDATE, DELETE ON {database}.booked_seat TO 'guest';")
        cursor.execute(f"GRANT CREATE TEMPORARY TABLES ON {database}.* TO 'guest';")
        cursor.execute(f"GRANT EXECUTE ON FUNCTION {database}.GenerateRandomString TO 'guest';")
        cursor.execute(f"GRANT EXECUTE ON FUNCTION {database}.CalculateFinalPrice TO 'guest';")
        cursor.execute(f"GRANT EXECUTE ON FUNCTION {database}.GenerateRandomGuestID TO 'guest';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.GuestCreateBooking TO 'guest';")
        cursor.execute(f"GRANT EXECUTE ON PROCEDURE {database}.CompleteBooking TO 'guest';")
        
        # Grant roles to users
        cursor.execute("GRANT 'admin' TO 'adminAccount'@'%';")
        cursor.execute("SET DEFAULT ROLE 'admin' TO 'adminAccount'@'%';")
        cursor.execute("GRANT 'staff' TO 'staffAccount'@'%';")
        cursor.execute("SET DEFAULT ROLE 'staff' TO 'staffAccount'@'%';")
        cursor.execute("GRANT 'registeredUser' TO 'registeredUserAccount'@'%';")
        cursor.execute("SET DEFAULT ROLE 'registeredUser' TO 'registeredUserAccount'@'%';")
        cursor.execute("GRANT 'guest' TO 'guestAccount'@'%';")
        cursor.execute("SET DEFAULT ROLE 'guest' TO 'guestAccount'@'%';")

        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create and grant users and roles")

