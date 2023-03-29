from django.urls import path

from rest.app.user.views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    UserRegisterView,
)

urlpatterns = [
    path("register", UserRegisterView.as_view(), name="user_register"),
    path("login", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/verify", CustomTokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh", CustomTokenRefreshView.as_view(), name="token_refresh"),
]
