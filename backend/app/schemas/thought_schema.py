from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.thought import Thought


class ThoughtSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Thought
        load_instance = True
