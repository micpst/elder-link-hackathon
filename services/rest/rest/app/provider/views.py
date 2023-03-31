from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from rest.app.provider.models import Provider
from rest.app.provider.serializer import ProviderSerializer


class ProviderListView(ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer


class ProviderDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
