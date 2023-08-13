from django.urls import path
from django.contrib import admin
from . import views

# Namespace name
app_name = 'scans'

# Be careful setting the name to just /login use userlogin instead!
urlpatterns=[
     path('admin/', admin.site.urls),
    path('results/<int:number>', views.index, name='index'),
    path('new/', views.new_scan, name='new'),
]
