from django.contrib.admin import ModelAdmin, register

from rest.app.provider.models import Provider


@register(Provider)
class ProviderAdmin(ModelAdmin):
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "phone",
        "longitude",
        "latitude",
        "activities",
    )
