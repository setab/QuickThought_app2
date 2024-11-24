from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.reaction import Reaction


class ReactionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reaction
        load_instance = True
