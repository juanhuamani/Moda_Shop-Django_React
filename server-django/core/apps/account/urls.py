from django.urls import path
from . import views

urlpatterns = [
    path('register', views.RegisterView.as_view(), name='register'),
    path('login', views.LoginView.as_view(), name='login'),
    path('logout', views.LogoutView.as_view(), name='logout'),

    path('session', views.SessionView.as_view(), name='session'),
    path('refresh', views.RefreshCookieView.as_view(), name='token_refresh'),

    path('profile', views.ProfileView.as_view(), name='profile'),
    path('profile/update', views.UpdateProfileView.as_view(), name='update-profile'),
    path('profile/avatar', views.AvatarUpdateView.as_view(), name='update-avatar'),

    path('password/change', views.ChangePasswordView.as_view(), name='change-password'),
]
