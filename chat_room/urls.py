from django.urls import path
from . import views

urlpatterns = [
  path('message-user/<str:username>/', views.message_user, name='chat-message-user'),
]