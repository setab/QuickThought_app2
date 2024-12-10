from flask import jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
import os
from app import db
from app.models.uploadImage import UploadImage

# Allowed file extensions
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}


def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def save_image(file, user_id, image_type):
    """
    Save the image to the user-specific folder and update the database.

    Args:
        file: The uploaded file.
        user_id: ID of the user uploading the file.
        image_type: Type of the image ('dp' or 'pp').

    Returns:
        A tuple containing a success status and a response message.
    """
    try:
        upload_folder = current_app.config.get("UPLOAD_FOLDER")
        if not upload_folder:
            return False, "Upload folder not configured."

        if file and allowed_file(file.filename):
            # Extract file extension and create a unique filename
            file_extension = os.path.splitext(file.filename)[1]
            filename = f"user_{user_id}_{image_type}{file_extension}"

            # Define the user-specific folder
            user_folder = os.path.join(upload_folder, str(user_id))
            os.makedirs(user_folder, exist_ok=True)

            # Save the file
            file_path = os.path.join(user_folder, filename)
            file.save(file_path)

            # Update or insert into the database
            existing_image = UploadImage.query.filter_by(user_id=user_id).first()
            if not existing_image:
                # Create a new record if it doesn't exist
                new_image = UploadImage(
                    dp=filename if image_type == "dp" else "",
                    pp=filename if image_type == "pp" else "",
                    user_id=user_id,
                )
                db.session.add(new_image)
            else:
                # Update the existing record
                if image_type == "dp":
                    existing_image.dp = filename
                elif image_type == "pp":
                    existing_image.pp = filename

            db.session.commit()
            return True, filename

        return False, "Invalid file type."
    except Exception as e:
        return False, f"An error occurred while saving the image: {str(e)}"


def upload_image_dp(file, user_id):
    """
    Handle the upload of a display picture (dp).
    """
    success, message = save_image(file, user_id, "dp")
    if success:
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Display picture uploaded successfully!",
                    "data": {"fileUrl": f"/serve_img/{user_id}/dp"},
                }
            ),
            200,
        )
    return jsonify({"success": False, "message": message}), 400


def upload_image_pp(file, user_id):
    """
    Handle the upload of a profile picture (pp).
    """
    success, message = save_image(file, user_id, "pp")
    if success:
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Profile picture uploaded successfully!",
                    "data": {"fileUrl": f"/serve_img/{user_id}/pp"},
                }
            ),
            200,
        )
    return jsonify({"success": False, "message": message}), 400


def serve_img(user_id, pic_type):
    """
    Serve an image file (dp or pp) for a specific user.
    """
    try:
        upload_folder = current_app.config.get("UPLOAD_FOLDER")
        if not upload_folder:
            return (
                jsonify({"success": False, "message": "Upload folder not configured."}),
                500,
            )

        user_folder = os.path.join(upload_folder, str(user_id))
        filename = f"user_{user_id}_{pic_type}.jpg"  # Default to .jpg
        file_path = os.path.join(user_folder, filename)

        if os.path.exists(file_path):
            return send_from_directory(user_folder, filename)

        return (
            jsonify(
                {"success": False, "message": f"{pic_type.capitalize()} not found."}
            ),
            404,
        )
    except Exception as e:
        return (
            jsonify(
                {"success": False, "message": "Error serving file.", "error": str(e)}
            ),
            500,
        )
