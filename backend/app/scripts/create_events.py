from app.scripts.db import get_db_connection


def drop_all_events():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_event_queries = []
        events_list = [
            "CheckBookingValidity"
        ]
        
        # Generate drop queries for all events and append to drop_queries list
        for event_name in events_list:
            drop_event_queries.append(f"DROP EVENT IF EXISTS {event_name};")
        
        # Execute all drop queries to emptify the database
        for drop_query in drop_event_queries:
            cursor.execute(drop_query)

        # Activate event scheduler
        cursor.execute("SET GLOBAL event_scheduler = ON;")
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to establish connection to database")


def create_events():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create check booking validity event -------
        create_check_booking_validity_event_query = """
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
        """
        cursor.execute(create_check_booking_validity_event_query)
        #--------------------------------------------------

        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create views")

