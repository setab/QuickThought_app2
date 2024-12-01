from app.models.reaction import Reaction
from app import db
from flask import jsonify
from sqlalchemy import func


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


def get_reaction_count(thought_id):
    try:
        # Count the number of reactions for the given thought_id
        like_count = (
            db.session.query(func.count(Reaction.id))
            .filter_by(thought_id=thought_id)
            .scalar()
        )
        return jsonify({"likes": like_count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
