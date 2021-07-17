from django.urls import path
from . import views

urlpatterns = [
  path('register/', views.register, name='user-register'),
  path('login/', views.login, name='user-login'),
  path('logout/', views.logout, name='user-logout'),
  path('suggestions/', views.suggestions, name='user-suggestions'),
  path('authenticate/', views.authenticate, name='user-authenticate'),
  path('follow/', views.follow, name='user-follow'),
  path('unfollow/', views.unfollow, name='user-unfollow'),
  path('profile/<str:username>', views.profile, name='user-profile'),
  path('following/<str:username>/', views.following, name='user-following'),
  path('update/<str:username>/', views.updateProfile, name='user-update'),
  path('my-messages/', views.my_messages, name='user-my-messages'),
]