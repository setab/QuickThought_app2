from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.uploadImage import UploadImage


class ReactionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UploadImage
        load_instance = True
