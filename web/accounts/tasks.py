from __future__ import absolute_import, unicode_literals

from celery import shared_task
from django.db import transaction
from django_tenants.utils import connection

from tenant.models import Tenant, Domain
from .serializers import AccountSerializer

from web.settings import APPLICATION_DOMAIN


@transaction.atomic
def create_account(data):
    print("creating account...")

    

    is_staff = data.get('is_staff', None)
    if is_staff:
        connection.set_schema_to_public()
        username = data['username']
        tenant = Tenant.objects.create(schema_name=username, name=username) 
        connection.set_tenant(tenant)
        data['tenant'] = tenant.id
        account = AccountSerializer(data=data)
       
        domain = Domain()
        domain.tenant = tenant
        domain.domain = f"{username}.{APPLICATION_DOMAIN}"
        print("account--> ", account)
        domain.save()
    else: 
        account = AccountSerializer(data=data)
        tenant = Tenant.objects.get(id=data['tenant'])
        connection.set_tenant(tenant)

    account.is_valid(raise_exception=True) 
    account.save()



def send_log_in_email(email):
    pass
