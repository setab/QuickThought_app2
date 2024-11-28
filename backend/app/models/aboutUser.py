from app import db


class AboutUser(db.Model):
    __tablename__ = "aboutUser"

    id = db.Column(db.Integer, primary_key=True)
    bio = db.Column(db.String(255), nullable=True)  # Increase bio length if needed
    # photos_id = db.Column(
    #     db.Integer, db.ForeignKey("photos.id"), nullable=True
    # )  # Corrected to Integer and ForeignKey
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # Foreign key for user

    # Relationships
    user = db.relationship(
        "User", backref=db.backref("aboutUser", uselist=False), lazy=True
    )
    # photos = db.relationship(
    #     "Photo", backref=db.backref("aboutUser", uselist=False), lazy=True
    # )
