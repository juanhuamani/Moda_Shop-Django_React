from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.RegisterView.as_view(), name='register'),
    path('login', views.LoginView.as_view(), name='login'),
    path('logout', views.LogoutView.as_view(), name='logout'),

    path('profile', views.ProfileView.as_view(), name='profile'),
    path('profile/update', views.UpdateProfileView.as_view(), name='update-profile'),

    path('password/change', views.ChangePasswordView.as_view(), name='change-password'),

    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
]