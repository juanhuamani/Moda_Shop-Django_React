from tabnanny import verbose
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario es obligatorio')
        if not email:
            raise ValueError('El correo electrónico es obligatorio')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True, verbose_name='username')
    email = models.EmailField(max_length=255, unique=True, verbose_name='email')

    first_name = models.CharField(max_length=30, blank=True, verbose_name='first name')
    last_name = models.CharField(max_length=30, blank=True, verbose_name='last name')
    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name='phone')
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name='address')
    birthdate = models.DateField(null=True, blank=True, verbose_name='birthdate')
    location = models.CharField(max_length=100, null=True, blank=True, verbose_name='location')

    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg', null=True, blank=True)

    is_active = models.BooleanField(default=True, verbose_name='active')
    is_staff = models.BooleanField(default=False, verbose_name='staff')

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.username
