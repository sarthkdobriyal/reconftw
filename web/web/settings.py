import os, secrets
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = secrets.token_hex(32)

DEBUG = os.environ.get('DJANGO_DEBUG', '') != 'False'

ipAddress=os.popen('hostname -I | cut -d " " -f1').read().strip()
ALLOWED_HOSTS = [ipAddress, 'localhost', '127.0.0.1', '0.0.0.0']

# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# Application definition

# INSTALLED_APPS = [
#     'django_celery_beat',
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'rest_framework_simplejwt.token_blacklist',
#     'projects',
#     'editprofile',
#     'scans',
#     'apikeys',
#     'rest_framework',
#     'corsheaders',
#     'django_celery_results',
# ]
# Application definition
"""
    These app's data are stored on the public schema
"""
SHARED_APPS = [
    'tenant_schemas',  # mandatory
    'tenant',  # you must list the app where your tenant model resides in
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'corsheaders',


    # we place blog here since we want 
    # public schema to have the same structure like tenant apps
    'accounts',

]
"""
    These app's data are stored on their specific schemas
"""
TENANT_APPS = [
    # The following Django contrib apps must be in TENANT_APPS
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.sessions',
    'django.contrib.messages',

    # tenant-specific apps
    'django_celery_beat',
    'django.contrib.staticfiles',
    # 'rest_framework_simplejwt.token_blacklist',
    
    'projects',
    'editprofile',
    'scans',
    'apikeys',
    'rest_framework',
    'corsheaders',
    'django_celery_results',
]

INSTALLED_APPS =  [
    'tenant_schemas',
    'tenant',

    # The following Django contrib apps must be in TENANT_APPS
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.sessions',
    'django.contrib.messages',

    # tenant-specific apps
    'django_celery_beat',
    'django.contrib.staticfiles',
    # 'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'projects',
    'editprofile',
    'scans',
    'apikeys',
    'rest_framework',
    'django_celery_results',
    'accounts',
    

]





REST_FRAMEWORK = {

    # 'DEFAULT_AUTHENTICATION_CLASSES': (
    #     'rest_framework_simplejwt.authentication.JWTAuthentication',
    # )
    'DEFAULT_AUTHENTICATION_CLASSES': [

        'auth.utils.DjangoReactJWTAuthentication',
    ]
    
}


# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
#     "ROTATE_REFRESH_TOKENS": True,
#     "BLACKLIST_AFTER_ROTATION": True,
#     "UPDATE_LAST_LOGIN": True,

#     "ALGORITHM": "HS256",
#     "VERIFYING_KEY": "",
#     "AUDIENCE": None,
#     "ISSUER": None,
#     "JSON_ENCODER": None,
#     "JWK_URL": None,
#     "LEEWAY": 0,

#     "AUTH_HEADER_TYPES": ("Bearer",),
#     "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
#     "USER_ID_FIELD": "id",
#     "USER_ID_CLAIM": "user_id",
#     # "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

#     "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
#     "TOKEN_TYPE_CLAIM": "token_type",
#     # "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

#     "JTI_CLAIM": "jti",

#     "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
#     "SLIDING_TOKEN_LIFETIME": timedelta(hours=12),
#     "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

#     # "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
#     # "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
#     # "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
#     # "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
#     # "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
#     # "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
# }


MIDDLEWARE = [
        # django tenant middleware
    # 'tenant_schemas.middleware.TenantMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'tenant.middleware.RequestIDTenantMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'web.urls'
PUBLIC_SCHEMA_URLCONF = 'web.urls'

DEFAULT_FILE_STORAGE='tenant_schemas.storage.TenantFileSystemStorage'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend', 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # 'loaders': [
            #     ('django.template.loaders.cached.Loader', [
            #         'django.template.loaders.filesystem.Loader',
            #         'django.template.loaders.app_directories.Loader',
            #         ]),
            # ],
        },
    },
]

WSGI_APPLICATION = 'web.wsgi.application'

# DATA_UPLOAD_MAX_MEMORY_SIZE = 2621440
DATA_UPLOAD_MAX_MEMORY_SIZE = 26214400
CACHE_MIDDLEWARE_SECONDS = 3600

APPLICATION_DOMAIN = 'scanner.skandashield.com'
REACT_SITE_URL= 'http://scanner.skandashield.com'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        # Tenant Engine
        'ENGINE': 'tenant_schemas.postgresql_backend',
        # set database name
        'NAME': os.environ.get('DB_NAME'),
        # set your user details
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST':os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT')
    }
   
}

# DATABASE ROUTER
DATABASE_ROUTERS = (
    'tenant_schemas.routers.TenantSyncRouter',
)

AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend']

TENANT_MODEL = "tenant.Tenant"

# TENANT_DOMAIN_MODEL = "tenant.Domain"

AUTH_USER_MODEL = 'accounts.Account'


#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql_psycopg2',
#        'NAME': 'web',
#        'USER': 'reconftw',
#        'PASSWORD': 'TorvaldS*12',
#        'HOST': 'localhost',
#        'PORT': '5432',
#    }
#}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    os.path.join(BASE_DIR, 'frontend', 'dist', 'assets'),
]
STATIC_ROOT = BASE_DIR / "staticfiles"
# STATIC_ROOT = BASE_DIR / "static"


LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'projects:index'
LOGOUT_REDIRECT_URL = 'login'


# Celery Settings
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'db+postgresql://postgres:recon123@localhost:5432/postgres'
CELERY_ACCEPT_CONTENT=['application/json']
CELERY_TASK_SERIALIZER='json'
CELERY_RESULT_SERIALIZER='json'
CELERY_ENABLE_UTC = False
CELERY_TIMEZONE = TIME_ZONE
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CELERY_ROUTES = {
 'scans.tasks.run_scan': {'queue': 'run_scans'},
 'scans.tasks.new_scan_single_domain': {'queue': 'new_scan'}
}

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost",
#     "http://localhost:4173",
#     "http://localhost:9050",
#     "http://127.0.0.1",
#     "http://127.0.0.1:4173",
#     "http://43.204.147.61",
# ]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-requested-with',
    'x-request-id', 
    'access-control-allow-origin' # Add 'x-request-id' to the list of allowed headers
]


# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': True,
#     'formatters': {
#         'standard': {
#             'format': '[%(levelname)s] %(asctime)-15s - %(message)s',
#             'datefmt': '%d/%b/%Y %H:%M:%S',
#         },
#         'color': {
#             '()': 'colorlog.ColoredFormatter',
#             'format':
#                 '%(log_color)s[%(levelname)s] %(asctime)-15s - %(message)s',
#             'datefmt': '%d/%b/%Y %H:%M:%S',
#             'log_colors': {
#                 'DEBUG': 'cyan',
#                 'INFO': 'green',
#                 'WARNING': 'yellow',
#                 'ERROR': 'red',
#                 'CRITICAL': 'red,bg_white',
#             },
#         },
#     },
#     'handlers': {
#         'logfile': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': 'debug.log',
#             'formatter': 'standard',
#         },
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#             'formatter': 'color',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#         'django.db.backends': {
#             'handlers': ['console', 'logfile'],
#             # DEBUG will log all queries, so change it to WARNING.
#             'level': 'INFO',
#             'propagate': False,   # Don't propagate to other handlers
#         },
#         'web.apikeys': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#         'web.projects': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#         'web.scans': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#         'web.schedules': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#         'web.web': {
#             'handlers': ['console', 'logfile'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#     },
# }
