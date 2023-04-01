from typing import Any

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.parsers import FileUploadParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from rest.app.provider.models import Provider
from rest.app.provider.serializer import ProviderSerializer


class ProviderListView(ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        providers = serializer.data
        return Response(providers)


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
