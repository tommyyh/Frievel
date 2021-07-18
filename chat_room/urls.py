from django.urls import path
from . import views

urlpatterns = [
  path('message-user/<str:username>/', views.message_user, name='chat-message-user'),
  path('get-user/<int:chat_id>/', views.get_user, name='chat-get-user'),
  path('room-check/<str:username>/', views.room_check, name='chat-room-check'),
  path('inbox/<int:id>/', views.messages, name='chat-room-check'),
  path('get-unread/', views.get_unread, name='chat-get-unread'),
  path('seen/<int:id>/', views.seen, name='chat-seen'),
]