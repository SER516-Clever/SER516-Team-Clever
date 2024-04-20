from pydantic import BaseModel


class TechDebtRequest(BaseModel):
    projectId: str = None
    startDate: str = None
    endDate: str = None
    attributeKey: str = None
