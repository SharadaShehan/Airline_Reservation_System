from app.scripts.db import get_db_connection
from flask import current_app


def drop_all_tables():
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()
        drop_table_queries = []
        # Get all table names from the database
        select_all_tables_query = "SELECT table_name FROM information_schema.tables WHERE table_schema = %s;"
        cursor.execute(select_all_tables_query, (current_app.config['MYSQL_DB'],))
        
        # Generate drop queries for all tables and append to drop_queries list
        for table_name in cursor.fetchall():
            drop_table_queries.append(f"DROP TABLE IF EXISTS {table_name[0]};")
        
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

        #------- Create users table -------
        create_users_table_query = """
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL );
        """
        cursor.execute(create_users_table_query)
        #-----------------------------------

        #------- Create airports table -----
        #-----------------------------------
        
        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create tables")

