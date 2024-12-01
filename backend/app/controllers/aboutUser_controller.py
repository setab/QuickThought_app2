from app.models.aboutUser import AboutUser
from app import db
from flask import session, jsonify


def get_aboutUser(user_id):
    aboutUser = AboutUser.query.filter_by(user_id=user_id).first()
    if not aboutUser:
        return jsonify({"message": "nothing to show"})
    aboutUser = [
        {
            "id": aboutUser.id,
            "bio": aboutUser.bio,
            "user_id": aboutUser.user_id,
            "username": aboutUser.user.username,
        }
    ]
    return jsonify({"aboutUser": aboutUser}), 200


def add_aboutUser(user_id, bio):
    aboutUser = AboutUser.query.filter_by(user_id=user_id).first()
    if aboutUser:
        return jsonify({"message": "everything is already added"})
    new_aboutUser = AboutUser(user_id=user_id, bio=bio)
    db.session.add(new_aboutUser)
    db.session.commit()
    return jsonify({"message": "bio added successfully"}), 201
