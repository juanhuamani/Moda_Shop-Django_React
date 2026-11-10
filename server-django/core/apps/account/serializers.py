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
    # Fields a self-registration may set. Anything else in the payload
    # (is_staff, is_superuser, is_active, groups, ...) is ignored.
    REGISTRABLE_FIELDS = (
        'username',
        'email',
        'first_name',
        'last_name',
        'phone',
        'birthdate',
        'location',
        'password',
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'phone',
            'birthdate',
            'location',
            'password',
            'password2',
        ]
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
        allowed_data = {
            field: validated_data[field]
            for field in self.REGISTRABLE_FIELDS
            if field in validated_data
        }
        user = User.objects.create_user(**allowed_data)
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

        # Same generic error as a wrong password: no account enumeration.
        if not user.is_active:
            raise serializers.ValidationError('Credenciales inválidas.')

        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'birthdate', 'location', 'avatar']


class AvatarSerializer(serializers.ModelSerializer):
    # required=False so a missing file reports "No file was submitted." instead
    # of DRF's generic required message.
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['avatar']

    def validate(self, attrs):
        if not attrs.get('avatar'):
            raise serializers.ValidationError({'avatar': ['No file was submitted.']})
        return attrs


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