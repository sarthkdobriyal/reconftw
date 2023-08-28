from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from .models import Account
from tenant.models import Tenant


class AccountSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    class Meta:
        model = Account
        fields = ['name', 'username', 'password', 'confirm_password', 'tenant']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(_("passwords don't match"))
        return super().validate(attrs)
 
    def create(self, validated_data): # Remove tenant identifier from validated_data
        print("tenant --> ",validated_data['tenant'] )

        is_staff = validated_data.get('is_staff', None)
        if is_staff:
            return Account.objects.create_staffuser(
                name=validated_data['name'],
                username=validated_data['username'],
                password=validated_data['password'],
                tenant=validated_data['tenant'],
 
            )

        return Account.objects.create_user(
            name=validated_data['name'],
            username=validated_data['username'],
            password=validated_data['password'],
            tenant=validated_data['tenant'],
        )
