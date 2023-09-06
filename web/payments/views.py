from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import stripe
from django.conf import settings
from django.shortcuts import redirect
from tenant.models import Tenant
from datetime import datetime, timedelta


stripe.api_key='sk_test_51Nn5Y9SEz2uDPeQIXjPSCVCfYM6AHqYrKptVDHt9H0vOIjdXTvCApw2dZkkOz3sAkyyLEvuE1Uns3kOmdyYCY9gP00GaDTQhd1'

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


# @api_view(['POST'])
@permission_classes([IsAuthenticated])
class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': 'price_1Nn77hSEz2uDPeQIhdOU1vut',
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url=settings.REACT_SITE_URL + '/checkout?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.REACT_SITE_URL + '/checkout?canceled=true',
            )
            print('checkout_session', checkout_session)
            return Response({'redirectTo': checkout_session.url, 'amount': checkout_session.amount_total/100}, status=status.HTTP_200_OK)
        except :
            return Response({'message': 'Error generating stripe checkout session'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated,])
def handlePaymentSuccess(request):
    print(request.data['tenant_id'])
    try:
        tenant_id = request.data['tenant_id']
        tenant = Tenant.objects.get(id=tenant_id)
        today = datetime.now().date()
        paid_until = today + timedelta(days=30)
        tenant.paid_until = paid_until
        tenant.save()
        return Response({'message': 'Subscription successful'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
