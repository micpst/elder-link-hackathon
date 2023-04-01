from rest_framework.serializers import ModelSerializer

from rest.app.provider.models import Provider


class ProviderSerializer(ModelSerializer):
    class Meta:
        model = Provider
        fields = (
            "email",
            "first_name",
            "last_name",
            "phone",
            "longitude",
            "latitude",
            "activities",
        )