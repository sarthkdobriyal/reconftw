from django.urls import path
from payments.views import StripeCheckoutView, test_payment, handlePaymentSuccess



urlpatterns = [
    path('test-payment/', test_payment, name='test_payment'),
    path('create-checkout-session', StripeCheckoutView.as_view(), name='create_checkout_session'),
    path('payment-success', handlePaymentSuccess, name='handle_payment_success'),
] 