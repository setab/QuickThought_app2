from app.models.reaction import Reaction
from app import db
from flask import jsonify


def like_thought(thought_id, user_id):
    existing_like = Reaction.query.filter_by(
        thought_id=thought_id, user_id=user_id
    ).first()
    if existing_like:
        return jsonify({"message": "You have already liked this thought"}), 400

    # If not, add the like
    new_like = Reaction(thought_id=thought_id, user_id=user_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify({"message": "Like added successfully"}), 201
