from django.db import models
from tenant_schemas.models import TenantMixin
from django_tenants_celery_beat.models import TenantTimezoneMixin

import uuid




class Tenant(TenantMixin, TenantTimezoneMixin):
    REQUIRED_FIELDS = ('tenant_name', 'schema_name', 'domain_url')
    tenant_name = models.CharField(max_length=100, unique=True, null=False, blank=False, )
    tenant_uuid = models.UUIDField(default=uuid.uuid4, null=False, blank=False)
    paid_until = models.DateField(null=True)
    on_trial = models.BooleanField(default=False)
    created_on = models.DateField(auto_now_add=True)
    domain_url = models.URLField(blank=True, null=True, default='localhost')
    is_active = models.BooleanField(default=True, blank=True)
        # default true, schema will be automatically created and
    # synced when it is saved
    auto_create_schema = True

    """
    USE THIS WITH CAUTION!
    Set this flag to true on a parent class if you want the schema to be
    automatically deleted if the tenant row gets deleted.
    """
    auto_drop_schema = True
