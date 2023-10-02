from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from app.config import Config
from app.api.cache import cache
from app.api.routes import api_bp
from app.scripts.routes import api_bp_init
from flask_jwt_extended import JWTManager


app = Flask(__name__)
CORS(app, origins='http://localhost:5000', supports_credentials=True)

cache.init_app(app)

app.register_blueprint(api_bp_init, url_prefix='/init')
app.register_blueprint(api_bp, url_prefix='/api')

app.config.from_object(Config)
jwt = JWTManager(app)

