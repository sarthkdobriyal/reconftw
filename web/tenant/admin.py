from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from .models import Tenant, Domain
# Register your models here.

admin.site.register(Domain)
class DomainInline(admin.TabularInline):
    model = Domain
    max_num = 1

@admin.register(Tenant)

class TenantAdmin(TenantAdminMixin, admin.ModelAdmin):
    inlines = [DomainInline,]
    list_display = (
        "name",
        "created_on",
        )

