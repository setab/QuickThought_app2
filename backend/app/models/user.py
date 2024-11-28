from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = "users"  # Match the actual table name in MySQL

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    # firebase_uid = db.Column(db.String(255), nullable=True, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )
    password = db.Column(db.String(255), nullable=False)
    # pp = db.relationship("UploadImage", backref=db.backref("users", lazy=True))
    # dp = db.relationship("UploadImage", backref=db.backref("users", lazy=True))

    # Hash password
    def set_passwd(self, password):
        self.password = generate_password_hash(password)

    # Verify password
    def check_passwd(self, password):
        # Use check_password_hash to compare the raw password with the hashed password
        return check_password_hash(self.password, password)
