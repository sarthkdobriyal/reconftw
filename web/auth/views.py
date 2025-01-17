from django.utils.translation import gettext_lazy as _

from rest_framework.decorators import api_view
from rest_framework.views import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.models import Account
from accounts.serializers import AccountSerializer
from tenant.models import Tenant
from .serializers import DjangoReactJWTSerializers

from accounts.tasks import create_account, send_log_in_email

# Create your views here.


class DjangoReactObtainToken(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = DjangoReactJWTSerializers


@api_view(['POST'])
def sign_up(request):


    print(request.data)

    serializer = AccountSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    find_one = Tenant.objects.filter(schema_name=request.data.get('username'))
    if find_one.first():
        return Response(status=HTTP_400_BAD_REQUEST, data=_('this username is already exists'))

    create_account(data=request.data)
    send_log_in_email(email=request.data.get('email'))
    return Response(status=HTTP_201_CREATED, data=_('account created login next'))
