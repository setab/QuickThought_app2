from app import db


class Reaction(db.Model):
    __tablename__ = "reactions"

    id = db.Column(db.Integer, primary_key=True)
    thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    thought = db.relationship("Thought", backref="reactions")
