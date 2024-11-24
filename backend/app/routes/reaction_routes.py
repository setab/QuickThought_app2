from flask import Blueprint, request, session, jsonify
from app.controllers.reactions_controller import like_thought

reaction_bp = Blueprint("reaction", __name__, url_prefix="/api/reaction")


@reaction_bp.route("/like", methods=["POST"])
def like():
    if request.method == "POST":
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"message": "User not logged in"}), 401

        # Extract thought_id from the JSON payload
        data = request.get_json()
        thought_id = data.get("thought_id")

        if not thought_id:
            return jsonify({"message": "can't find Thought ID"}), 400

        # Call the controller function and pass the extracted data
        return like_thought(thought_id, user_id)
