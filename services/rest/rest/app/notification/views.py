from typing import Any

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import IntegerField, Serializer
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from rest.app.notification.services import NotificationService
from rest.app.provider.models import Provider


class SendNotificationView(APIView):
    class InputSerializer(Serializer):
        provider_id = IntegerField(required=True)

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            selected_provider = Provider.objects.get(
                id=serializer.validated_data["provider_id"]
            )
        except Provider.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        NotificationService.send_mail(
            to_email=selected_provider.email,
            name=selected_provider.first_name,
        )
        NotificationService.send_sms(
            to_phone=selected_provider.phone,
            name=selected_provider.first_name,
        )

        return Response(status=HTTP_200_OK)
