from email.policy import default
from enum import unique
from pyexpat import model
from tkinter.tix import Tree
from turtle import onclick
from unittest import result
from xml.sax import default_parser_list
from django.contrib.auth.models import AbstractUser
from django.db import models

GENDER_SELECION = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('NS', 'Not Specified'),
]

BMI_SELECTION = [
    ('UW', 'UnderWeight'),
    ('HW', 'HealthyWeight'),
    ('OW', 'OverWeight'),
    ('O', 'Obesity'),
]

# user model for normal user and retailer distinguished by "is_retailer" field
class CustomUser(AbstractUser):
    firstname = models.CharField(blank=True, null=True, max_length=150)
    lastname = models.CharField(blank=True, null=True, max_length=150)
    date_of_birth = models.DateField(blank=True, null=True, default=None)
    gender = models.CharField(blank=True, null=True,
                              max_length=150, choices=GENDER_SELECION)
    bmi = models.CharField(blank=True, null=True,
                           max_length=150, choices=BMI_SELECTION)
    email = models.EmailField(unique=True, null=True)
    phone_number = models.CharField(max_length=150, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    is_retailer = models.BooleanField(default=False, null=True)
    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.username


def upload_path(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class Record(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    image = models.ImageField(blank=True, null=True, upload_to=upload_path)
    fruit = models.CharField(max_length=30, null=True, blank=True)
    days_left = models.IntegerField(null=True, blank=True)
    ripe_percentage = models.FloatField(null=True, blank=True)
    creation_time = models.DateTimeField()

    def __str__(self):
        return f"Record(user={self.user}, creation_time = {self.creation_time})"
