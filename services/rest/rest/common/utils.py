from hashlib import sha256
from secrets import token_urlsafe


def generate_random_text(length: int = 32) -> str:
    return token_urlsafe(length)


def compute_sha256(data: str) -> str:
    return sha256(data.encode("utf-8")).hexdigest()
