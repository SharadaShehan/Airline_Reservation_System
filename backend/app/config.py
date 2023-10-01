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
    MYSQL_DB = os.environ.get('MYSQL_DB')

    INIT_ENABLED = int(os.environ.get('INIT_ENABLED', 0))
    MYSQL_CURSORCLASS = 'DictCursor'    # ensures that query results are returned as dictionaries