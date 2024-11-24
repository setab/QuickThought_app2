from flask import Blueprint, request, session
from app.controllers.thought_controller import (
    get_thoughts,
    add_thoughts,
    get_all_thought_user,
)

thought_bp = Blueprint("thought", __name__, url_prefix="/api/thought")


@thought_bp.route("/thoughts", methods=["GET"])
def get_all_thoughts():
    if request.method == "GET":
        print("in thought routes")
        return get_thoughts()
    return {"message:": "error getting data"}, 401


@thought_bp.route("/userthoughts", methods=["GET"])
def get_all_user_thoughts():
    # Get the user_id from the session
    user_id = session.get("user_id")
    if not user_id:
        return {"message": "User not logged in"}, 401

    return get_all_thought_user(user_id)


@thought_bp.route("/addThoughts", methods=["POST"])
def add_thought():
    # Get the user_id from the session
    user_id = session.get("user_id")
    if not user_id:
        return {"message": "User not logged in"}, 401

    # Get content from the request
    data = request.json
    content = data.get("content")
    if content:
        return add_thoughts(content, user_id)
    else:
        return {"message": "Content is required"}, 400
