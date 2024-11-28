# upload_controller.py
from flask import jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
import os
from app import db
from app.models.uploadImage import UploadImage

ALLOWED_EXTENSIONS = {"jpg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_image_dp(file, user_id):
    upload_folder = current_app.config.get("UPLOAD_FOLDER")
    if file and allowed_file(file.filename):
        # Extract the file extension
        file_extension = os.path.splitext(file.filename)[
            1
        ]  # Includes the dot (e.g., '.jpg')

        # Create a new filename
        filename = f"user_{user_id}_dp{file_extension}"

        # Define the user-specific folder
        user_folder = os.path.join(upload_folder, str(user_id))
        os.makedirs(user_folder, exist_ok=True)

        # Save the file
        file_path = os.path.join(user_folder, filename)
        file.save(file_path)

        # Update the database with the new file name
        new_image = UploadImage(dp=filename, pp="", user_id=user_id)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "Dsiplay pic upload done!"}), 200

    return jsonify({"message": "File type not allowed"}), 400


def upload_image_pp(file, user_id):
    upload_folder = current_app.config.get("UPLOAD_FOLDER")
    if file and allowed_file(file.filename):
        # Extract the file extension
        file_extension = os.path.splitext(file.filename)[
            1
        ]  # Includes the dot (e.g., '.jpg')

        # Create a new filename
        filename = f"user_{user_id}_pp{file_extension}"

        # Define the user-specific folder
        user_folder = os.path.join(upload_folder, str(user_id))
        os.makedirs(user_folder, exist_ok=True)

        # Save the file
        file_path = os.path.join(user_folder, filename)
        file.save(file_path)

        # Update the database with the new file name
        new_image = UploadImage(dp="", pp=filename, user_id=user_id)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "Profile pic upload done!"}), 200

    return jsonify({"message": "File type not allowed"}), 400


def serve_img(user_id, pic_type):
    upload_folder = current_app.config.get("UPLOAD_FOLDER")
    user_folder = os.path.join(upload_folder, str(user_id))
    if pic_type == "pp":
        profile_pic_filename = f"user_{user_id}_pp.jpg"
    else:
        profile_pic_filename = f"user_{user_id}_dp.jpg"

    file_path = os.path.join(user_folder, profile_pic_filename)
    print(file_path)

    if os.path.exists(file_path):
        return send_from_directory(user_folder, profile_pic_filename)

    return jsonify({"message": "Profile picture not found"}), 404
