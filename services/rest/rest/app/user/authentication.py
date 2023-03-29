from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken

from rest.app.user.models import User


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request: Request) -> tuple[User, AccessToken]:
        try:
            return super().authenticate(request)
        except AuthenticationFailed as e:
            raise e
