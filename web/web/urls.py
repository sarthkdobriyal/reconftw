from django.urls import path,include
from django.contrib import admin
from django.views.generic import TemplateView
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
from auth.views import DjangoReactObtainToken
from auth.views import sign_up

urlpatterns = [
    # path('', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('admin/', admin.site.urls),
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/token/', DjangoReactObtainToken.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', sign_up, name='sign_up'),
    # path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    # path('logout/', auth_views.LogoutView.as_view(template_name='logged_out.html'), name='logout'),
    path('api/projects/', include('projects.urls')),
    path('api/scans/', include('scans.urls')),
    path('api/schedules/', include('schedules.urls')),
    path('api/apikeys_settings/', include('apikeys.urls')),
    path('api/edit_profile/', include('editprofile.urls')),

] 
