from django.contrib import admin
from .models import Post, Saved, Like, Comment, Comment_like

admin.site.register(Post)
admin.site.register(Saved)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Comment_like)