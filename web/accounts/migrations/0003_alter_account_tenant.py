# Generated by Django 4.2.4 on 2023-08-29 20:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0005_rename_client_tenant'),
        ('accounts', '0002_account_tenant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tenant.tenant'),
        ),
    ]