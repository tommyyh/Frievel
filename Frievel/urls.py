from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('post/', include('post.urls')),
    path('room/', include('chat_room.urls')),
    re_path('', TemplateView.as_view(template_name='index.html')),
]