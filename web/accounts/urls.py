from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('employees', views.getEmployees, name='employees'),
    path('clients', views.getClients, name='clients'),
    path('employee/<int:id>/delete', views.deleteEmployee, name='deleteEmployee'),
    path('employee/<int:account_id>/toggle_is_active', views.toggle_is_active, name='toggle_is_active'),
]
