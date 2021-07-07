from django.urls import path
from . import views

urlpatterns = [
  path('register/', views.register, name='user-register'),
  path('login/', views.login, name='user-login'),
  path('logout/', views.logout, name='user-logout'),
  path('suggestions/', views.suggestions, name='user-suggestions'),
  path('authenticate/', views.authenticate, name='user-authenticate'),
  path('follow/', views.follow, name='user-follow'),
]