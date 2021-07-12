from django.urls import path
from . import views

urlpatterns = [
  path('posts/', views.posts, name='post-posts'),
  path('save-post/', views.save_post, name='post-save-post'),
  path('unsave-post/', views.unsave_post, name='post-save-post'),
  path('saved/', views.saved, name='post-saved'),
  path('new-post/', views.new_post, name='post-new_post'),
  path('check-if-saved/', views.check_if_saved, name='post-check-if-saved'),
  path('check-if-liked/', views.check_if_liked, name='post-check-if-liked'),
  path('like-post/', views.like_post, name='post-like'),
  path('unlike-post/', views.unlike_post, name='post-unlike'),
  path('delete/', views.delete, name='post-delete'),
]