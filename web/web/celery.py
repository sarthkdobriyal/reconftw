import os
from celery import Celery
from tenant_schemas_celery.app import CeleryApp as TenantAwareCeleryApp

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')


# app = Celery('web')
app = TenantAwareCeleryApp('web')

app.conf.enable_utc = False
app.conf.update(timezone = 'Asia/Kolkata')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()