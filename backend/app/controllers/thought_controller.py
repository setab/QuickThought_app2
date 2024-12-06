from app.models.thought import Thought  # Make sure to import the Thought model
from app import db
from flask import jsonify


def get_thoughts():
    thoughts = Thought.query.filter_by().all()

    if not thoughts:
        return jsonify({"message": "No thoughts found for this user"}), 404

    thoughts_data = [
        {
            "id": thought.id,
            "content": thought.content,
            "timestamp": thought.timestamp,
            "user_id": thought.user_id,
            "username": thought.user.username,
        }
        for thought in thoughts
    ]

    return jsonify({"thoughts": thoughts_data}), 200


def get_all_thought_user(user_id):
    # Query the thoughts based on user_id
    user_thoughts = Thought.query.filter_by(user_id=user_id).all()

    # If no thoughts are found, return a 404 error message
    if not user_thoughts:
        return jsonify({"message": "Not posted any thoughts yet"}), 404

    # Prepare the data to send back
    user_thoughts_data = [
        {
            "id": user_thought.id,
            "content": user_thought.content,
            "timestamp": user_thought.timestamp,
        }
        for user_thought in user_thoughts
    ]

    # Return the thoughts with a 200 OK response
    return jsonify({"thoughts": user_thoughts_data}), 200


def add_thoughts(content, user_id):
    new_thought = Thought(content=content, user_id=user_id)
    db.session.add(new_thought)
    db.session.commit()
    return jsonify({"message": "content added successfully"})


def delete_thought(thought_id):
    try:
        # Query the thought by ID
        thought_to_delete = Thought.query.filter_by(id=thought_id).first()

        if not thought_to_delete:
            return jsonify({"message": "Thought not found"}), 404

        # Delete the thought
        db.session.delete(thought_to_delete)
        db.session.commit()

        return (
            jsonify({"success": True, "message": "Thought deleted successfully"}),
            200,
        )
    except Exception as e:
        db.session.rollback()  # Rollback if something goes wrong
        return (
            jsonify(
                {"success": True, "message": f"Failed to delete thought: {str(e)}"}
            ),
            500,
        )
