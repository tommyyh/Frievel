from django.urls import path
from . import views

urlpatterns = [
  path('posts/', views.posts, name='post-posts'),
  path('save-post/', views.save_post, name='post-save-post'),
  path('unsave-post/', views.unsave_post, name='post-save-post'),
  path('saved/', views.saved, name='post-saved'),
  path('new-post/', views.new_post, name='post-new_post'),
  path('check-if-saved/', views.check_if_saved, name='post-check-if-saved'),
]