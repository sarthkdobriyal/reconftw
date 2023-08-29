from django.contrib.auth.models import update_last_login

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Account
from tenant.models import Tenant
from rest_framework import serializers
class DjangoReactJWTSerializers(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)
        token['id'] =user.pk
        token['username'] =user.get_username()
        token['is_superuser'] =user.is_superuser
        token['is_staff'] =user.is_staff
        token['tenant'] = TenantSerializer(user.tenant).data
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.pk
        data['username'] = self.user.get_username()
        data['is_superuser'] = self.user.is_superuser
        data['is_staff'] = self.user.is_staff
        data['tenant'] = TenantSerializer(self.user.tenant).data

        update_last_login(None, self.user)

        return data


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'schema_name']