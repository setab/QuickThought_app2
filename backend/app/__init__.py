from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    CORS(app)
    Session(app)
    db.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.thought_routes import thought_bp
    from app.routes.reaction_routes import reaction_bp
    from app.routes.aboutUser_route import aboutUser_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(thought_bp)
    app.register_blueprint(reaction_bp)
    app.register_blueprint(aboutUser_bp)

    return app
