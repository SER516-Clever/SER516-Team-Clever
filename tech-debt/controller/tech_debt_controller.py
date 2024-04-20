from datetime import date

from fastapi import APIRouter, Header
from typing import Annotated


from model.tech_debt_model import TechDebtRequest
from service.tech_debt_service import get_zero_business_value_user_stories

router = APIRouter()


@router.post("/metric/TechDebt")
def get_zero_business_value(
    techDebtRequest: TechDebtRequest,
    token: Annotated[str | None, Header()] = None
):
    zero_bv_stories = get_zero_business_value_user_stories(
        techDebtRequest.projectId,
        techDebtRequest.startDate,
        techDebtRequest.endDate,
        techDebtRequest.attributeKey,
        token
    )

    return {
        "zero_bv_us": zero_bv_stories
    }
