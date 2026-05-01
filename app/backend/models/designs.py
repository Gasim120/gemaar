from core.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Designs(Base):
    __tablename__ = "designs"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    original_image_key = Column(String, nullable=True)
    result_image_url = Column(String, nullable=True)
    prompt = Column(String, nullable=True)
    style = Column(String, nullable=True)
    status = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=True)