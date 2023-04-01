from django.urls import path

from rest.app.provider.views import (
    ProviderAvatarUploadView,
    ProviderDetailsView,
    ProviderListView,
)


urlpatterns = [
    path("", ProviderListView.as_view(), name="provider_list"),
    path("/<int:pk>", ProviderDetailsView.as_view(), name="provider_details"),
    path("/<int:pk>/upload", ProviderAvatarUploadView.as_view(), name="provider_avatar_upload"),
]
