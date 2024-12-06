from app.models.reaction import Reaction
from app.models.thought import Thought  # Assuming there's a Thought model
from app import db
from flask import jsonify
from sqlalchemy import func
from sqlalchemy.orm import joinedload


# Like or Unlike a Thought
def like_thought(thought_id, user_id):
    try:
        # Check if the user has already liked the thought
        existing_like = Reaction.query.filter_by(
            thought_id=thought_id, user_id=user_id
        ).first()

        if existing_like:
            # If already liked, remove the like
            db.session.delete(existing_like)
            db.session.commit()
            return jsonify({"success": True, "message": "Like removed"}), 200

        # If not liked, add a new like
        new_like = Reaction(thought_id=thought_id, user_id=user_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"success": True, "message": "Like added"}), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# Get Reaction Count for a Thought
def get_reaction_count(thought_id):
    try:
        # Count the number of reactions for the given thought_id
        like_count = (
            db.session.query(func.count(Reaction.id))
            .filter_by(thought_id=thought_id)
            .scalar()
        )
        return jsonify({"success": True, "data": {"likes": like_count}}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# Get User's Likes
def get_user_likes(user_id):
    try:
        # Query all likes for the given user_id
        likes = (
            db.session.query(Reaction)
            .filter_by(user_id=user_id)
            .options(
                joinedload(Reaction.thought)
            )  # Eagerly load related 'thought' data
            .all()
        )

        # Serialize the likes into a list of dictionaries
        likes_data = [
            {
                "id": like.id,
                "thought_id": like.thought_id,
                "user_id": like.user_id,
                "timestamp": like.timestamp,  # Assuming there's a timestamp field
                # "thought_content": like.thought.content,  # Include thought content
            }
            for like in likes
        ]

        return jsonify({"success": True, "data": {"likes": likes_data}}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
