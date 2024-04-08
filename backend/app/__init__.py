from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from app.config import Config
from app.api.cache import AppCache
from app.scripts.routes import api_bp_init
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

app.config.from_object(Config)
AppCache.init_cache(app)

from app.api.routes import api_bp
app.register_blueprint(api_bp_init, url_prefix='/init')
app.register_blueprint(api_bp, url_prefix='/api')

jwt = JWTManager(app)

