from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from .models import Account
from tenant.models import Tenant
from rest_framework.serializers import ModelSerializer


class AccountSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    class Meta:
        model = Account
        fields = ['name', 'username', 'password', 'confirm_password', 'tenant', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(_("passwords don't match"))
        return super().validate(attrs)
 
    def create(self, validated_data): 

        is_staff = validated_data.get('is_staff', None)
        if is_staff:
            return Account.objects.create_staffuser(
                name=validated_data['name'],
                username=validated_data['username'],
                password=validated_data['password'],
                tenant=validated_data['tenant'] if validated_data['tenant'] else None,
                is_staff=True,
            )

        return Account.objects.create_user(
            name=validated_data['name'],
            username=validated_data['username'],
            password=validated_data['password'],
            tenant=validated_data['tenant'] if validated_data['tenant'] else None,
        )

class AccountRestSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'username', 'created_date', 'tenant','is_staff']