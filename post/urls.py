from django.urls import path
from . import views

urlpatterns = [
  path('posts/', views.posts, name='post-posts'),
  path('saved/', views.saved, name='post-saved'),
  path('new-post/', views.new_post, name='post-new_post'),
]