from django.urls import path
from backend import views
from .views import UserListView
from backend.views import CreateRecord
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('', UserListView.as_view()),
    path('settings', views.get_settings, name="settings"),
    path('createRecord', CreateRecord.as_view(), name="createRecord"),
    path('getResult/<int:id>',
         views.get_result, name="getResult"),
    path('updateFruitName/<int:id>',
         views.update_fruit_name, name="updateFruitName"),
    path('getHistory/<int:id>', views.get_history, name="getHistory")
]
