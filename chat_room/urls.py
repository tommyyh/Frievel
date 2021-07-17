from django.urls import path
from . import views

urlpatterns = [
  path('message-user/<str:username>/', views.message_user, name='chat-message-user'),
  path('get-user/<int:chat_id>/', views.get_user, name='chat-get-user'),
  path('room-check/<str:username>/', views.room_check, name='chat-room-check'),
]