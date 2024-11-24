from app import db


class Friendship(db.Model):
    __tablename__ = "friendships"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(
        db.Enum("pending", "accepted", "declined", "blocked"), default="pending"
    )
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship("User", foreign_keys=[user_id], backref="sent_requests")
    friend = db.relationship(
        "User", foreign_keys=[friend_id], backref="received_requests"
    )
