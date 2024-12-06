from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # CORS(
    #     app,
    #     resources={r"/*": {"origins": "http://127.0.0.1:9000"}},
    #     supports_credentials=True,
    # )
    app.config.from_object("app.config.Config")
    app.config["UPLOAD_FOLDER"] = os.path.join(
        os.path.dirname(app.root_path), "uploads"
    )
    app.config["MAX_CONTENT_LENGTH"] = 5 * 1000 * 1000
    app.config.update(
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_SAMESITE="Lax",
    )

    CORS(app, supports_credentials=True)
    Session(app)
    db.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.thought_routes import thought_bp
    from app.routes.reaction_routes import reaction_bp
    from app.routes.aboutUser_route import aboutUser_bp
    from app.routes.uploadImage_route import uploadImage_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(thought_bp)
    app.register_blueprint(reaction_bp)
    app.register_blueprint(aboutUser_bp)
    app.register_blueprint(uploadImage_bp)

    return app
