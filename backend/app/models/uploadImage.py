from app import db


class UploadImage(db.Model):
    __tablename__ = "photos"  # Explicitly define the table name

    id = db.Column(db.Integer, primary_key=True)
    dp = db.Column(db.String(100), nullable=False)
    pp = db.Column(db.String(100), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # Referencing 'user' table

    uploaded_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    # thought = db.relationship("Thought", back_populates="images")
