from django.urls import path

from rest.app.provider.views import ProviderDetailsView, ProviderListView


urlpatterns = [
    path("", ProviderListView.as_view(), name="provider_list"),
    path("/<int:pk>", ProviderDetailsView.as_view(), name="provider_details"),
]
