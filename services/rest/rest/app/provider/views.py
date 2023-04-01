from typing import Any

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.parsers import FileUploadParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import CharField, DecimalField, ListField, Serializer
from rest_framework.status import HTTP_200_OK
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from rest.app.provider.models import Provider
from rest.app.provider.serializer import ProviderSerializer
from rest.app.provider.services import Filter, MatchingService


class ProviderListView(ListCreateAPIView):
    class FilterSerializer(Serializer):
        activities = ListField(child=CharField())
        longitude = DecimalField(max_digits=9, decimal_places=7)
        latitude = DecimalField(max_digits=9, decimal_places=7)

    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    def get(self, request, *args, **kwargs) -> Response:
        filters_serializer = self.FilterSerializer(data=request.query_params)
        filters_serializer.is_valid(raise_exception=True)

        filtered_queryset = MatchingService.match(filters=Filter(**filters_serializer.validated_data))

        serializer = self.serializer_class(filtered_queryset, many=True)
        return Response(data=serializer.data, status=HTTP_200_OK)


class ProviderDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer


class ProviderAvatarUploadView(UpdateAPIView):
    parser_class = (FileUploadParser,)
    queryset = Provider.objects.all()

    def put(self, request, *args, **kwargs):
        provider = self.get_object()
        provider.profile_photo = request.data["file"]
        provider.save()
        return Response(status=HTTP_204_NO_CONTENT)
