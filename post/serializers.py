from rest_framework import serializers
from .models import Post, Saved

class PostsSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.name')
  author_username = serializers.CharField(source='author.username')
  author_profile_pic = serializers.CharField(source='author.profilePic.url')

  class Meta:
    model = Post
    fields = '__all__'

class SavedSerializer(serializers.ModelSerializer):
  post_content = serializers.CharField(source='post.content')
  post_file = serializers.ReadOnlyField()
  post_published_at = serializers.DateField(source='post.published_at')
  post_likes = serializers.IntegerField(source='post.likes')
  account_name = serializers.CharField(source='post.author.name')
  account_username = serializers.CharField(source='post.author.username')
  account_profile_pic = serializers.CharField(source='post.author.profilePic.url')

  class Meta:
    model = Saved
    fields = '__all__'