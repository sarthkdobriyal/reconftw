from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from .models import Tenant
# Register your models here.

# admin.site.register(Domain)
# class DomainInline(admin.TabularInline):
#     model = Domain
#     max_num = 1

@admin.register(Tenant)

class TenantAdmin(TenantAdminMixin, admin.ModelAdmin):
    inlines = []
    list_display = (
        "tenant_name",
        "created_on",
        "domain_url",
        "paid_until"
        )

