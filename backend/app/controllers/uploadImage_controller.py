# upload_controller.py
from flask import jsonify, current_app
from werkzeug.utils import secure_filename
import os
from app import db
from app.models.uploadImage import UploadImage

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_image_dp(file, user_id):
    upload_folder = current_app.config.get("UPLOAD_FOLDER")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        user_folder = os.path.join(upload_folder, str(user_id))
        os.makedirs(user_folder, exist_ok=True)
        # user_file_path = os.path.join(user_folder, filename)
        file.save(os.path.join(user_folder, filename))
        new_image = UploadImage(dp=filename, pp="", user_id=user_id)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "File upload done!"}), 200

    return jsonify({"message": "File type not allowed"}), 400


def upload_image_pp(file, user_id):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))

        new_image = UploadImage(dp="", pp=filename, user_id=user_id)

        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "File upload done!"}), 200

    return jsonify({"message": "File type not allowed"}), 400
