from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User
from django.db.models import Q
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField( write_only=True)
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with this email already exists."
            )
        ]
    )
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
           'email': {'required': True}, 
           'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')

        if not identifier or not password:
            raise serializers.ValidationError('Ambos campos son requeridos.')

        user = User.objects.filter(
            Q(username=identifier) | Q(email=identifier)
        ).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError('Credenciales inválidas.')

        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'birthdate', 'location', 'avatar']


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True, validators=[validate_password])
    confirmPassword = serializers.CharField(required=True)

    def validate(self, data):
        user = self.context['request'].user

        if not user.check_password(data['password']):
            raise serializers.ValidationError({"password": "La contraseña actual no es correcta"})

        if data['newPassword'] != data['confirmPassword']:
            raise serializers.ValidationError({"confirmPassword": "Las contraseñas no coinciden"})

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['newPassword'])
        instance.save()
        return instance