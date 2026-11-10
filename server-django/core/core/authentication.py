"""DRF authentication from the httpOnly ``access_token`` cookie.

Tokens never travel in an ``Authorization`` header in this project: the browser
holds both tokens as httpOnly cookies and this class is the only authenticator.
"""

from rest_framework_simplejwt.authentication import JWTAuthentication

ACCESS_TOKEN_COOKIE = 'access_token'


class CookieJWTAuthentication(JWTAuthentication):
    """Authenticate a request with the ``access_token`` cookie only."""

    def authenticate(self, request):
        raw_token = request.COOKIES.get(ACCESS_TOKEN_COOKIE)
        if not raw_token:
            # Anonymous: no 401 from the authenticator itself.
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token

    def authenticate_header(self, request):
        # A non-empty value keeps DRF answering 401 (not 403) for unauthenticated
        # requests: the client's single-flight refresh keys on 401 only.
        return 'Cookie'
