from pydantic import BaseModel


class BurndownChartRequest(BaseModel):
    milestoneIds: list = None
    attributeKey: str = None
