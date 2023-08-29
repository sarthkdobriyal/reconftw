from django.contrib import admin
from .models import Account

# Register your models here.
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    model=Account
    list_display = ['name', 'username', 'is_active', 'is_staff', 'is_superuser', 'created_date', 'tenant']
    list_filter = ['is_active', 'is_staff', 'is_superuser', 'created_date', 'tenant']

    fieldsets = (
        (None, {'fields': ('name', 'username', 'password', 'tenant')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    