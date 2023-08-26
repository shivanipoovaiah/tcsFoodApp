from sre_parse import State
from telnetlib import AUTHENTICATION
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.core import serializers as core_serializers
import random

from backend.models import CustomUser, Record
from .serializers import UserListSerializer, RecordSerializer

from backend.models_folder import fruit360
from backend.models_folder import rgb


class UserListView(ListCreateAPIView):
    """
    An endpoint for listing all the users and their data.

    :method GET
    :param not needed
    :return:
    :: status = 200 (OK) / 400 (BAD REQUEST) and a list of all the users' data
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserListSerializer


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.

    :method PUT
    :header :Authorizatio token needed
    :param request
    :param  :
        :: old password and new password
    :return:
        :: status = 200 (OK) / 400 (BAD REQUEST)
    """
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateRecord(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        """ 
        Create a new scanning record

        :method POST
        :param request
        :return:
            :: status = 200 (OK) / 400 (BAD REQUEST)
        """
        record_data = request.data.copy()
        # save only user, image, and creation_time before calling the model
        record_data['creation_time'] = timezone.now()
        serializer = RecordSerializer(
            data=record_data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            context = serializer.data
            new_record = Record.objects.last()
            # run model to get the remaining values (as for now, only the fruit name is obtained from the model, other parameters are dummy)
            new_record.fruit = fruit360.run_image(str(new_record.image))
            new_record.days_left = random.randint(0, 100)
            new_record.ripe_percentage = round(random.random(), 4)
            new_record.save()

            context['fruit'] = new_record.fruit
            context['days_left'] = new_record.days_left
            context['ripe_percentage'] = new_record.ripe_percentage
            context['record_id'] = new_record.pk
            return Response(context, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["GET"])
def get_result(request, id):
    """ 
    Get the result of record

    :method GET
    :param request
    :param id:
        :: the record ID stored in Record model
    :return:
        :: status = 200 (OK) / 400 (BAD REQUEST)
    """
    context = {}
    if request.method == "GET":
        # get the record
        record = get_object_or_404(Record, id=id)
        print('Record #{} fetched from db: {} (type={})'.format(
            id, record.image, type(record.image)))
        context['user'] = record.user.pk
        context['image'] = record.image
        context['fruit'] = record.fruit
        context['days_left'] = record.days_left
        context['ripe_percentage'] = record.ripe_percentage
        context['creation_time'] = record.creation_time

        serializer = RecordSerializer(
            data=context, context={"request": request}, )
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["POST"])
def update_fruit_name(request, id):
    """ 
    Update the fruit name of an existing record

    :method POST
    :param request
    :param id:
        :: the record ID stored in Record model
    :return:
        :: status = 200 (OK) / 400 (BAD REQUEST)
    """
    context = {}
    if request.method == "POST":
        record = get_object_or_404(Record, id=id)
        print('Record #{} fetched from db: {} (type={})'.format(
            id, record.image, type(record.image)))
        request_data = request.data.copy()
        if ('fruit_name' not in request_data) or (not request_data['fruit_name']):
            context['msg'] = "invalid fruit name provided"
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        # update that record
        record.fruit = request_data['fruit_name']
        record.save()
        context['msg'] = "fruit name successfully updated"
        return Response(context, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def get_history(request, id):
    """ 
    Get the last 5 scan result of the current user

    :method GET
    :param request
    :param id:
        :: the user ID 
    :return:
        :: status = 200 (OK) / 400 (BAD REQUEST)
    """
    if request.method == "GET":
        user = get_object_or_404(CustomUser, id=id)
        # get the last five record of this user
        histories = Record.objects.filter(
            user=user).order_by('-creation_time')[:5]
        print("Histories: ",  histories)
        serializer = RecordSerializer(
            histories, context={"request": request}, many=True)
        data = serializer.data
        print("DATA")
        print(data)
        return Response(data, status=status.HTTP_200_OK)


def get_settings(request):
    context = {}
    context['settings'] = "App is running"
    return render(request, 'tcsFoodApp/setting-page.html', context)
