from django.contrib import admin

from backend.models import CustomUser, Record

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Record)
