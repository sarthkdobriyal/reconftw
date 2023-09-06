from django.contrib.auth.models import update_last_login

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Account
from tenant.models import Tenant
from rest_framework import serializers
from datetime import date
from rest_framework.exceptions import PermissionDenied , ValidationError
from rest_framework.response import Response
from rest_framework import status
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
        print(self.user)
        try: 
            user_tenant_id = Account.objects.filter(username=self.user).values('tenant_id')[0]['tenant_id']
            # user_is_superuser = Account.objects.filter(username=self.user).values('is_superuser')[0]['is_superuser']
            # tenant_paid_until = Tenant.objects.filter(id=user_tenant_id).values('paid_until')[0]['paid_until']
            # Check if the tenant's paid_until date has passed
            # if user_is_superuser == False:
            #     if  (tenant_paid_until == None  or tenant_paid_until < date.today()):
            #         raise ValidationError('Subscription has expired. Please renew your subscription.')
        except Exception as e:
            raise PermissionDenied()
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
        fields = ['id', 'schema_name', 'tenant_uuid', 'paid_until', 'on_trial', 'created_on', 'domain_url', 'is_active']














