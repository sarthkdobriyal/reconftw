# Generated by Django 4.2.4 on 2023-09-22 22:38

from django.db import migrations
import timezone_field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0007_remove_tenant_name_tenant_on_trial_tenant_paid_until_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tenant',
            name='timezone',
            field=timezone_field.fields.TimeZoneField(default='UTC'),
        ),
    ]