from __future__ import absolute_import, unicode_literals

from celery import shared_task
from django.db import transaction
from django_tenants.utils import connection

from tenant.models import Tenant, Domain
from .serializers import AccountSerializer

from web.settings import APPLICATION_DOMAIN



def create_account(data):
    account = AccountSerializer(data=data)
    account.is_valid(raise_exception=True)
    connection.set_schema_to_public()
    username = data['username']
    tenant = Tenant.objects.create(schema_name=username)
    connection.set_tenant(tenant)
    domain = Domain()
    domain.tenant = tenant
    domain.domain = f"{username}.{APPLICATION_DOMAIN}"
    account.save()
    domain.save()



def send_log_in_email(email):
    pass
