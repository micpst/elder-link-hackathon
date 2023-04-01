from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

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
