from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = SECRET_KEY

    MYSQL_HOST = os.environ.get('MYSQL_HOST')
    MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))
    MYSQL_USER = os.environ.get('MYSQL_USER')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')
    MYSQL_ADMIN_ACCOUNT = os.environ.get('MYSQL_ADMIN_ACCOUNT')
    MYSQL_ADMIN_PASSWORD = os.environ.get('MYSQL_ADMIN_PASSWORD')
    MYSQL_STAFF_ACCOUNT = os.environ.get('MYSQL_STAFF_ACCOUNT')
    MYSQL_STAFF_PASSWORD = os.environ.get('MYSQL_STAFF_PASSWORD')
    MYSQL_REGISTERED_USER_ACCOUNT = os.environ.get('MYSQL_REGISTERED_USER_ACCOUNT')
    MYSQL_REGISTERED_USER_PASSWORD = os.environ.get('MYSQL_REGISTERED_USER_PASSWORD')
    MYSQL_GUEST_USER_ACCOUNT = os.environ.get('MYSQL_GUEST_USER_ACCOUNT')
    MYSQL_GUEST_USER_PASSWORD = os.environ.get('MYSQL_GUEST_USER_PASSWORD')
    MYSQL_DB = os.environ.get('MYSQL_DB')
    REDIS_HOST = os.environ.get('REDIS_HOST')
    REDIS_PORT = int(os.environ.get('REDIS_PORT', 6379))

    INIT_ENABLED = int(os.environ.get('INIT_ENABLED', 0))
    MYSQL_CURSORCLASS = 'DictCursor'    # ensures that query results are returned as dictionaries