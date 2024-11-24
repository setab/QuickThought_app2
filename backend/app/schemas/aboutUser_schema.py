from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.aboutUser import AboutUser


class AboutUserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = AboutUser
        load_instance = True
