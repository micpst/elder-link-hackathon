from typing import Any

from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken

from rest.app.user.models import User
from rest.common.utils import compute_sha256, generate_random_text


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.fingerprint = generate_random_text(length=50)

    def get_token(self, user: User) -> RefreshToken:
        token = super().get_token(user)
        token["fgp"] = compute_sha256(self.fingerprint)
        return token

    def validate(self, attrs: dict) -> dict:
        data = super().validate(attrs)
        data["fgp"] = self.fingerprint
        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs: dict) -> dict:
        refresh = self.token_class(attrs["refresh"])
        fingerprint = self.context["request"].COOKIES.get("fgp", "")
        fingerprint_hash = compute_sha256(fingerprint)

        if fingerprint_hash != refresh.get("fgp", ""):
            raise TokenError("Fingerprint is invalid")

        return {"access": str(refresh.access_token)}


class CustomTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs: dict) -> dict:
        token = UntypedToken(attrs["token"])
        fingerprint = self.context["request"].COOKIES.get("fgp", "")
        fingerprint_hash = compute_sha256(fingerprint)

        if fingerprint_hash != token.get("fgp", ""):
            raise TokenError("Fingerprint is invalid")

        return {}


class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }
