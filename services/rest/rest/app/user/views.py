from datetime import datetime
from typing import Any

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
    TokenVerifyView,
)

from rest.app.user.serializers import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    CustomTokenVerifySerializer,
    UserRegisterSerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Takes a set of user credentials and returns an access, refresh JSON web
    token pair and fingerprint cookie to prove the authentication of those credentials.
    """

    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

    def finalize_response(
        self, request: Request, response: Response, *args: Any, **kwargs: Any
    ) -> Response:
        response = super().finalize_response(request, response, *args, **kwargs)
        fingerprint = response.data.pop("fgp", "")
        response.set_cookie(
            key="fgp",
            value=fingerprint,
            secure=True,
            httponly=True,
            samesite="Strict",
            expires=str(datetime.now() + api_settings.REFRESH_TOKEN_LIFETIME),
        )
        return response


class CustomTokenRefreshView(TokenRefreshView):
    """
    Takes a refresh type JSON web token and returns an access type JSON
    web token if the refresh token is valid.
    """

    permission_classes = (AllowAny,)
    serializer_class = CustomTokenRefreshSerializer


class CustomTokenVerifyView(TokenVerifyView):
    """
    Takes a token and indicates if it is valid.  This view provides no
    information about a token's fitness for a particular use.
    """

    permission_classes = (AllowAny,)
    serializer_class = CustomTokenVerifySerializer


class UserRegisterView(CreateAPIView):
    """
    Takes a set of user data, saves new user in the database
    and returns an access and refresh JSON web token pair.
    """

    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer
