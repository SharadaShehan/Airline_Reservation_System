import mysql.connector
from flask import current_app


def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=current_app.config['MYSQL_HOST'],
            port=current_app.config['MYSQL_PORT'],
            user=current_app.config['MYSQL_USER'],
            password=current_app.config['MYSQL_PASSWORD'],
            database=current_app.config['MYSQL_DB'])
        return connection
    except Exception as ex:
        print("Could not connect to database\n", ex)
        return None


def get_db_connection_admin():
    try:
        connection = mysql.connector.connect(
            host=current_app.config['MYSQL_HOST'],
            port=current_app.config['MYSQL_PORT'],
            user=current_app.config['MYSQL_ADMIN_ACCOUNT'],
            password=current_app.config['MYSQL_ADMIN_PASSWORD'],
            database=current_app.config['MYSQL_DB'])
        return connection
    except Exception as ex:
        print("Could not connect to database\n", ex)
        return None
    
def get_db_connection_staff():
    try:
        connection = mysql.connector.connect(
            host=current_app.config['MYSQL_HOST'],
            port=current_app.config['MYSQL_PORT'],
            user=current_app.config['MYSQL_STAFF_ACCOUNT'],
            password=current_app.config['MYSQL_STAFF_PASSWORD'],
            database=current_app.config['MYSQL_DB'])
        return connection
    except Exception as ex:
        print("Could not connect to database\n", ex)
        return None

def get_db_connection_registered_user():
    try:
        connection = mysql.connector.connect(
            host=current_app.config['MYSQL_HOST'],
            port=current_app.config['MYSQL_PORT'],
            user=current_app.config['MYSQL_REGISTERED_USER_ACCOUNT'],
            password=current_app.config['MYSQL_REGISTERED_USER_PASSWORD'],
            database=current_app.config['MYSQL_DB'])
        return connection
    except Exception as ex:
        print("Could not connect to database\n", ex)
        return None

def get_db_connection_guest_user():
    try:
        connection = mysql.connector.connect(
            host=current_app.config['MYSQL_HOST'],
            port=current_app.config['MYSQL_PORT'],
            user=current_app.config['MYSQL_GUEST_USER_ACCOUNT'],
            password=current_app.config['MYSQL_GUEST_USER_PASSWORD'],
            database=current_app.config['MYSQL_DB'])
        return connection
    except Exception as ex:
        print("Could not connect to database\n", ex)
        return None
