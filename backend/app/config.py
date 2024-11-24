import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "i LOve me!!!")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URI", "mysql+pymysql://root:100123@localhost:33061/QuickThought"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
