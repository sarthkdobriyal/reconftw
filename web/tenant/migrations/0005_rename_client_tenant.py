# Generated by Django 4.2.4 on 2023-08-27 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0004_alter_client_is_active'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Client',
            new_name='Tenant',
        ),
    ]