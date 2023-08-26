from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from .models import Client, Domain
# Register your models here.

class DomainInline(admin.TabularInline):
    model = Domain
    max_num = 1

@admin.register(Client)
class ClientAdmin(TenantAdminMixin, admin.ModelAdmin):
    inlines = [DomainInline,]
    list_display = (
        "name",
        "created_on",
        )

