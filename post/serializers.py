from rest_framework import serializers
from .models import Post

class PostsSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.name')
  author_username = serializers.CharField(source='author.username')
  author_profile_pic = serializers.CharField(source='author.profilePic.url')

  class Meta:
    model = Post
    fields = '__all__'