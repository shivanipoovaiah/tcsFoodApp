from email.policy import default
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from backend.models import CustomUser, GENDER_SELECION, BMI_SELECTION, Record

# serializer for registration 
class CustomRegisterSerializer(RegisterSerializer):
    date_of_birth = serializers.DateField(allow_null=True, required=False)
    gender = serializers.ChoiceField(
        choices=GENDER_SELECION, allow_null=True, allow_blank=True, required=False)
    bmi = serializers.ChoiceField(
        choices=BMI_SELECTION, allow_null=True, required=False, allow_blank=True)
    firstname = serializers.CharField(
        max_length=50, allow_null=True, allow_blank=True, required=False)
    lastname = serializers.CharField(
        max_length=50, allow_null=True, allow_blank=True, required=False)
    phone_number = serializers.CharField(max_length=30, required=False)
    email = serializers.EmailField()
    address = serializers.CharField(max_length=150, required=False)
    is_retailer = serializers.BooleanField()

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.date_of_birth = self.data.get('date_of_birth')
        user.gender = self.data.get('gender')
        user.phone_number = self.data.get('phone_number')
        user.firstname = self.data.get('firstname')
        user.lastname = self.data.get('lastname')
        user.bmi = self.data.get('bmi')
        user.email = self.data.get('email')
        user.address = self.data.get('address')
        user.is_retailer = self.data.get('is_retailer')
        user.save()
        return user

# serializer for the users data given id 
class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'username',
            'firstname',
            'lastname',
            'password',
            'email',
            'gender',
            'phone_number',
            'bmi',
            'is_retailer',
            'address',
            'date_of_birth',
        )

# serializer for listing all the users' data endpoint
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'pk',
            'username',
            'firstname',
            'lastname',
            'password',
            'email',
            'gender',
            'phone_number',
            'bmi',
            'is_retailer',
            'address',
            'date_of_birth',
        ]

# serializer for change password
class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id','user', 'image', 'fruit', 'days_left',
                  'ripe_percentage', 'creation_time']
