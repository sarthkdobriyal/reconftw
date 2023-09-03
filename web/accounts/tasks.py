from __future__ import absolute_import, unicode_literals

from celery import shared_task
from django.db import transaction
from django_tenants.utils import connection

from tenant.models import Tenant
from .serializers import AccountSerializer

from web.settings import APPLICATION_DOMAIN


@transaction.atomic
def create_account(data):
    print("creating account...")

    

    is_staff = data.get('is_staff', None)
    if is_staff == True:
        connection.set_schema_to_public()
        username = data['username']
        domain = f"{username}.{APPLICATION_DOMAIN}"
        tenant = Tenant(schema_name=username, name=username, domain_url=domain)
        connection.set_tenant(tenant)
        tenant.save() 
        data['tenant'] = tenant.id
        account = AccountSerializer(data=data)
        account.is_staff = True
        account.tenant = tenant
        account.is_valid(raise_exception=True) 
        account.save()
    else: 
        account = AccountSerializer(data=data)
        tenant = Tenant.objects.get(id=data['tenant'])
        connection.set_tenant(tenant)
        account.is_valid(raise_exception=True) 
        account.save()

    print("account--> ", account)



def send_log_in_email(email):
    pass
