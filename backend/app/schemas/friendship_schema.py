from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.friendship import Friendship


class ReactionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Friendship
        load_instance = True
