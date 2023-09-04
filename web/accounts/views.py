from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account
from rest_framework import status
from .serializers import AccountRestSerializer
from tenant.models import Tenant
from django.db import connection

from django_tenants.management.commands.delete_tenant import Command as delCommand

# Create your views here.
@api_view(['GET'])
def getEmployees(request):
    if(request.user.is_staff):
        employees = Account.objects.filter(tenant=request.user.tenant.id, is_staff=False)
        employees = AccountRestSerializer(employees, many=True).data
        return Response(employees, status=status.HTTP_200_OK )
    else:
        return Response({'message': 'You need to be a superuser to access these'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getClients(request):
    if(request.user.is_superuser):
        clients = Account.objects.filter(is_staff=True,  is_superuser=False)
        res_data = []
        for client in clients:
            employees = []
            employeesDb = Account.objects.filter(tenant=client.tenant.id, is_staff=False) 
            for employee in employeesDb:
                employees.append(AccountRestSerializer(employee).data)
            serializedClient = AccountRestSerializer(client).data
            serializedClient['employees'] = employees
            res_data.append(serializedClient)
        return Response(res_data , status.HTTP_200_OK )
    else:
        return Response({'message': 'You need to be a superuser to access these'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def deleteEmployee(request, id):
    if(request.user.is_superuser):
        return deleteClient(request, id)
    elif(request.user.is_staff):
        toDeleteAccount = Account.objects.filter(id=id).values('tenant_id')[0]['tenant_id']
        toDeleteAccountTenant = Tenant.objects.filter(id=toDeleteAccount)
        if(toDeleteAccountTenant[0] == request.user.tenant):
            Account.objects.filter(id=id).delete()
            return Response({'message': 'Account Deleted'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED) 
    

def deleteClient(request, id):
    print('req user', request.user, id)
    if(not Account.objects.filter(id=id).values('is_staff')[0]['is_staff']):
        Account.objects.filter(id=id).delete()
        return Response({'message': 'Account Deleted'}, status=status.HTTP_200_OK)
    tenant_id = Account.objects.filter(id=id).values('tenant_id')[0]['tenant_id']
    print('deleting Tenant')
    Tenant.objects.filter(id=tenant_id).delete()
    return Response({'message': 'Account Deleted'}, status=status.HTTP_200_OK)
    


@api_view(['PATCH'])
def toggle_is_active(request, account_id):
    # Get the account instance by ID
    account = get_object_or_404(Account, id=account_id)

    print( account_id , " " ,  account.is_active)
    # Toggle the is_active attribute
    account.is_active = not account.is_active
    print(account.is_active)
    account.save()

    return Response({'message': 'Successfully toggled is_active.'}, status=status.HTTP_200_OK)
