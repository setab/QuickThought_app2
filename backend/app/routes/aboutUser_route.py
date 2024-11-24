from flask import Blueprint, request, session, jsonify
from app.controllers.aboutUser_controller import get_aboutUser, add_aboutUser

aboutUser_bp = Blueprint("aboutUser", __name__, url_prefix="/api/aboutUser")


@aboutUser_bp.route("/userData", methods=["GET"])
def getUserData():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"message": "User not logged in"}), 401

    return get_aboutUser(user_id)


@aboutUser_bp.route("/adduserDara", methods=["POST"])
def addUserData():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"message": "User not logged in"}), 401

    data = request.json
    bio = data.get("bio")
    return add_aboutUser(user_id, bio)
