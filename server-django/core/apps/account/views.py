from django.conf import settings
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    AvatarSerializer,
    LoginSerializer,
    PasswordSerializer,
    RegisterSerializer,
    UserSerializer,
)

ACCESS_TOKEN_COOKIE = 'access_token'
REFRESH_TOKEN_COOKIE = 'refresh_token'
# Only /auth/* endpoints receive the refresh cookie.
REFRESH_TOKEN_COOKIE_PATH = '/auth'


def _cookie_security():
    """Cookie flags from settings (see .env.example)."""
    return {
        'secure': settings.JWT_COOKIE_SECURE,
        'samesite': settings.JWT_COOKIE_SAMESITE,
    }


def _set_auth_cookies(response, access_token, refresh_token):
    """Set both auth cookies; max_age comes from SIMPLE_JWT, never a literal."""
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE,
        value=access_token,
        max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
        path='/',
        httponly=True,
        **_cookie_security(),
    )
    response.set_cookie(
        key=REFRESH_TOKEN_COOKIE,
        value=refresh_token,
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
        path=REFRESH_TOKEN_COOKIE_PATH,
        httponly=True,
        **_cookie_security(),
    )
    return response


def _clear_auth_cookies(response):
    """Delete both cookies with the same path/attribute scope used to set them.

    ``delete_cookie`` has no ``secure`` argument in Django; matching on path,
    domain and samesite is what makes a deletion take effect.
    """
    security = _cookie_security()
    response.delete_cookie(
        ACCESS_TOKEN_COOKIE,
        path='/',
        samesite=security['samesite'],
    )
    response.delete_cookie(
        REFRESH_TOKEN_COOKIE,
        path=REFRESH_TOKEN_COOKIE_PATH,
        samesite=security['samesite'],
    )
    return response


def _invalid_refresh_response():
    response = Response(
        {'detail': 'token_not_valid', 'code': 'refresh_invalid'},
        status=status.HTTP_401_UNAUTHORIZED,
    )
    return _clear_auth_cookies(response)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    throttle_scope = 'register'

    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'user': serializer.data,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    throttle_scope = 'login'

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        response = Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_200_OK)

        return _set_auth_cookies(response, str(refresh.access_token), str(refresh))


class RefreshCookieView(APIView):
    """Refresh from the cookie only. Rotation blacklists the old token."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        raw_token = request.COOKIES.get(REFRESH_TOKEN_COOKIE)
        if not raw_token:
            return _invalid_refresh_response()

        try:
            refresh = RefreshToken(raw_token)
        except TokenError:
            return _invalid_refresh_response()

        user_id = refresh.payload.get(jwt_settings.USER_ID_CLAIM)
        user = User.objects.filter(**{jwt_settings.USER_ID_FIELD: user_id}).first()
        if user is None or not user.is_active:
            return _invalid_refresh_response()

        serializer = TokenRefreshSerializer(data={'refresh': raw_token})
        if not serializer.is_valid():
            return _invalid_refresh_response()

        tokens = serializer.validated_data
        response = Response({'message': 'Token refreshed'}, status=status.HTTP_200_OK)
        return _set_auth_cookies(
            response,
            tokens['access'],
            tokens.get('refresh', raw_token),
        )


class LogoutView(APIView):
    """Always succeeds: an expired access token must not block a logout."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        raw_token = request.COOKIES.get(REFRESH_TOKEN_COOKIE)
        if raw_token:
            try:
                RefreshToken(raw_token).blacklist()
            except TokenError:
                pass

        response = Response({
           'message': 'Logout successful'
        }, status=status.HTTP_200_OK)

        return _clear_auth_cookies(response)


class SessionView(APIView):
    """Session probe for the client: 204 when the access cookie is valid."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response({
            'user': serializer.data,
            'message': 'Profile fetched successfully'
        }, status=status.HTTP_200_OK)


class AvatarUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        serializer = AvatarSerializer(request.user, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response({
            'user': UserSerializer(request.user).data,
            'message': 'Avatar updated successfully',
        }, status=status.HTTP_200_OK)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'user': serializer.data,
               'message': 'Profile updated successfully'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = PasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response({
                'message': 'Contraseña actualizada correctamente'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
