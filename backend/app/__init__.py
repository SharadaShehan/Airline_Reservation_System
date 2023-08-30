from flask import Flask
from flask_restful import Api
from app.config import Config
from app.api.routes import api_bp

app = Flask(__name__)
app.register_blueprint(api_bp, url_prefix='/api')

app.config.from_object(Config)
