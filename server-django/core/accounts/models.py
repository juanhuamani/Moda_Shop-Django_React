from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, password, email, phone, address):
        user = self.model(
            username=username,
            password=password,
            email=email,
            phone=phone,
            address=address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email, phone, address):
        user = self.create_user(
            username=username,
            password=password,
            email=email,
            phone=phone,
            address=address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20, default='')
    last_name = models.CharField(max_length=20, default='')
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'email', 'first_name', 'last_name']

    def __str__(self):
        return self.username