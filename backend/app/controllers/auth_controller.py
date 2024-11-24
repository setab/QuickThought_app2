from app.models.user import User
from app import db
from flask import session, jsonify


def login_user(username, password):
    # Corrected the filter_by to use the variable `username`
    user = User.query.filter_by(username=username).first()
    if user and user.check_passwd(password):
        session["user_id"] = user.id
        return {"message": "Login successful"}, 200

    return jsonify({"message": "Invalid credentials"}), 401


def register_user(username, email, password):
    # Check if the user already exists
    if (
        User.query.filter_by(username=username).first()
        or User.query.filter_by(email=email).first()
    ):
        return (
            jsonify({"message": "User already exists"}),
            400,
        )
    new_user = User(username=username, email=email)
    new_user.set_passwd(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registration successful"}), 201


def logout_user():
    user_id = session.get("user_id")

    if user_id:
        user = User.query.get(user_id)
        if user:
            print(f"Logging out user: {user.username} (ID: {user.id})")
            session.clear()
            return (
                jsonify(
                    {
                        "message": "Logged out successfully",
                        "user_id": user.id,
                        "user_name": user.username,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "User not found"}), 404
    else:
        return jsonify({"message": "No user logged in"}), 401
