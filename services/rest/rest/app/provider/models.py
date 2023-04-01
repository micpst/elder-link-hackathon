from enum import Enum

from django.contrib.postgres.fields import ArrayField
from django.db.models import CharField, DecimalField, EmailField, TextChoices

from rest.common.models import BaseModel


class Activity(Enum):
    TRANSPORTATION = "TRANSPORTATION"
    SHOPPING = "SHOPPING"
    HOME_VISIT = "HOME_VISIT"
    TECHNOLOGY_ASSISTANCE = "TECHNOLOGY_ASSISTANCE"
    MENTAL_HEALTH_SUPPORT = "MENTAL_HEALTH_SUPPORT"


class Provider(BaseModel):
    class Activity(TextChoices):
        TRANSPORTATION = Activity.TRANSPORTATION.value
        SHOPPING = Activity.SHOPPING.value
        HOME_VISIT = Activity.HOME_VISIT.value
        TECHNOLOGY_ASSISTANCE = Activity.TECHNOLOGY_ASSISTANCE.value
        MENTAL_HEALTH_SUPPORT = Activity.MENTAL_HEALTH_SUPPORT.value

    first_name = CharField(max_length=255, null=False, blank=False)
    last_name = CharField(max_length=255, null=False, blank=False)
    email = EmailField(max_length=255, null=False, blank=False, unique=True)
    phone = CharField(max_length=20, null=False, blank=False, unique=True)
    longitude = DecimalField(max_digits=9, decimal_places=7)
    latitude = DecimalField(max_digits=9, decimal_places=7)
    activities = ArrayField(
        base_field=CharField(max_length=255, choices=Activity.choices, null=False, blank=False),
        blank=True,
    )
