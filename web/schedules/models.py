from django.db import models

# Create your models here.
from django_tenants_celery_beat.models import PeriodicTaskTenantLinkMixin

class PeriodicTaskTenantLink(PeriodicTaskTenantLinkMixin):
    pass