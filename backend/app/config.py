import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "i LOve me!!!")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URI", "mysql+pymysql://root:100123@localhost:33061/QuickThought"
    )

    # For Docker, use host.docker.internal (Linux/Mac) or the IP address of your host (Windows)
    # SQLALCHEMY_DATABASE_URI = os.getenv(
    #     "DATABASE_URI",
    #     "mysql+pymysql://root:100123@host.docker.internal:3306/QuickThought",
    # )
    # For docker container
    # SQLALCHEMY_DATABASE_URI = (
    #     "mysql+pymysql://root:100123@mysql-server:3306/QuickThought"
    # )
    # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:100123@db:3306/QuickThought"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
