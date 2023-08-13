from django.urls import path,include
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf.urls.static import static
from django.conf import settings

from .views import MyTokenObtainPairView

from projects import views
from scans import views
from apikeys import views
from editprofile import views

urlpatterns = [
    # path('', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('admin/', admin.site.urls),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    # path('logout/', auth_views.LogoutView.as_view(template_name='logged_out.html'), name='logout'),
    path('projects/', include('projects.urls')),
    path('scans/', include('scans.urls')),
    path('schedules/', include('schedules.urls')),
    path('apikeys_settings/', include('apikeys.urls')),
    path('edit_profile/', include('editprofile.urls')),

] 
