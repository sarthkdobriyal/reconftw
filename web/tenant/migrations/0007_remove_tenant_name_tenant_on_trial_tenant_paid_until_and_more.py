# Generated by Django 4.2.4 on 2023-09-03 12:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0006_tenant_domain_url_alter_tenant_schema_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tenant',
            name='name',
        ),
        migrations.AddField(
            model_name='tenant',
            name='on_trial',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='tenant',
            name='paid_until',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='tenant',
            name='tenant_name',
            field=models.CharField(default='public', max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tenant',
            name='tenant_uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='domain_url',
            field=models.URLField(blank=True, default='localhost', null=True),
        ),
    ]
