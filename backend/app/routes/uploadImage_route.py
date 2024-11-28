# upload_routes.py
from flask import Blueprint, request, jsonify, session
from app.controllers.uploadImage_controller import (
    upload_image_dp,
    upload_image_pp,
    serve_img,
)

uploadImage_bp = Blueprint("uploadImage", __name__, url_prefix="/api/uploadImage")


@uploadImage_bp.route("/uploaddp", methods=["POST", "GET"])
def upload_file_dp():
    if request.method == "POST":
        if "file" not in request.files:
            return {"message": "No file part"}

        file = request.files["file"]

        if file.filename == "":
            return {"message": "No selected file"}
        user_id = session.get("user_id")
        return upload_image_dp(file, user_id)
    else:
        return jsonify({"message": "upload  Image is working on get method"})


@uploadImage_bp.route("/uploadpp", methods=["POST", "GET"])
def upload_file_pp():
    if request.method == "POST":
        if "file" not in request.files:
            return {"message": "No file part"}

        file = request.files["file"]

        if file.filename == "":
            return {"message": "No selected file"}
        user_id = session.get("user_id")
        return upload_image_pp(file, user_id)
    else:
        return jsonify({"message": "upload  Image is working on get method"})


@uploadImage_bp.route("/getpp", methods=["GET"])
def get_pp():
    user_id = session.get("user_id")
    return serve_img(user_id, "pp")


@uploadImage_bp.route("/getpp/<int:user_id>", methods=["GET"])
def get_any_pp(user_id):
    # user_id = session.get("user_id")
    return serve_img(user_id, "pp")


@uploadImage_bp.route("/getdp", methods=["GET"])
def get_dp():
    user_id = session.get("user_id")
    return serve_img(user_id, "dp")
