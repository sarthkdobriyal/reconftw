from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files.storage import FileSystemStorage
from .imgUser import imgUser
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



def edit(request):
    response = "change made!"

    username = request.user
    dbUser = User.objects.get(username=username)

    post = request.data


    if 'username' in post:
        if dbUser.username != post['username']:
            dbUser.username = post['username']



    if 'email' in post:
        if dbUser.email != post['email']:
            dbUser.email = post['email']




    if 'CurrentPassword' in post and 'NewPassword' in post and 'ConfirmPassword' in post:
        if post['CurrentPassword'] != "" and post['NewPassword'] != "" and post['ConfirmPassword'] != "":
            CurrentPassword = post['CurrentPassword']

            if dbUser.check_password(CurrentPassword):
                if post['NewPassword'] == post['ConfirmPassword']:
                    dbUser.set_password(post['NewPassword'])
                else:
                    response = "new password and confirmation password are different!"
            else:
                response = "Current password wrong!"





    if 'UserPicture' in request.FILES:
        path = "static/imgUsers/img"+str(request.user.id)+".png"

        if os.path.exists(path):
            os.remove(path)

        myfile = request.FILES['UserPicture']
        fs = FileSystemStorage()
        filename = fs.save(path, myfile)



    if 'RemoveImg' in post:
        if post['RemoveImg'] == 'on':
            imagePath = "static/imgUsers/img" + str(dbUser.id) + ".png"

            if os.path.exists(imagePath):
                os.remove(imagePath)

            
        

    dbUser.save()
    

    return post['username'], response 
 

# @login_required(login_url='/login/')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def index(request):

    if request.method == "POST":
        username, response = edit(request)
    
    else:
        username = request.user
        response = ""
    print(request.data)
    print(request.user) 

    # dbUser = User.objects.get(username=username)

    
    # email = dbUser.email

    # imagePath = imgUser(request.user.id)

    # context = {
    #     "imagePath": imagePath,
    #     'UserName': username, 
    #     'email': email,
    #     'response': response,
    #     }
        
    # return render(request, "edit_profile.html", context)
    if response == 'change made!':
        return Response(response)
    else:
        return Response(response, status=400)
