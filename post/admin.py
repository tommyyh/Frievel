from django.contrib import admin
from .models import Post, Saved, Like

admin.site.register(Post)
admin.site.register(Saved)
admin.site.register(Like)