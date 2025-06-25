from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from db import db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Authorization", "Content-Type"])

    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    from routes.persona_routes import persona_bp
    app.register_blueprint(persona_bp, url_prefix="/api/personas")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
