from app import db


class Thought(db.Model):
    __tablename__ = "thoughts"  # Explicitly define the table name

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # Referencing 'user' table

    user = db.relationship(
        "User", backref=db.backref("thoughts", lazy=True)
    )  # Relationship to User
    # images = db.relationship("UploadImage", backref=db.backref("thoughts", lazy=True))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    # profile_picture = db.relationship(
    #     "UploadImage",
    #     primaryjoin="foreign(Thought.user_id) == remote(UploadImage.user_id)",
    #     uselist=False,  # Assuming one user has one profile picture
    # )
