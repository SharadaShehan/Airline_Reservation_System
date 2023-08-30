from .db import get_db_connection
from flask import current_app


def drop_all_tables():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        drop_queries = []
        select_all_users_query = "SELECT table_name FROM information_schema.tables WHERE table_schema = %s;"
        cursor.execute(select_all_users_query, (current_app.config['MYSQL_DB'],))
        
        for table_name in cursor.fetchall():
            drop_queries.append(f"DROP TABLE IF EXISTS {table_name[0]};")
        
        for drop_query in drop_queries:
            cursor.execute(drop_query)
        
        connection.commit()
        connection.close()
    else:
        print("Falied to delete tables")


def create_tables():
    connection = get_db_connection()
    if connection :
        cursor = connection.cursor()
        create_users_table_query = """
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL );
        """
        cursor.execute(create_users_table_query)
        connection.commit()
        connection.close()
    else:
        print("Falied to create tables")

