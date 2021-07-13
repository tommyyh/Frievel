from rest_framework import serializers
from .models import Comment, Post, Saved, Like

class CommentSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.name')
  author_username = serializers.CharField(source='author.username')
  author_profile_pic = serializers.CharField(source='author.profilePic.url')
  comment_likes = serializers.ReadOnlyField()

  class Meta:
    model = Comment
    fields = '__all__'

  def create(self, validated_data):
    return Comment.objects.create(**validated_data)

class PostsSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.name')
  author_username = serializers.CharField(source='author.username')
  author_profile_pic = serializers.CharField(source='author.profilePic.url')
  post_likes = serializers.ReadOnlyField()
  post_comments = CommentSerializer(many=True, read_only=True)

  class Meta:
    model = Post
    fields = '__all__'

class SavedSerializer(serializers.ModelSerializer):
  post_content = serializers.CharField(source='post.content')
  post_file = serializers.ReadOnlyField()
  post_published_at = serializers.DateField(source='post.published_at')
  account_name = serializers.CharField(source='post.author.name')
  account_username = serializers.CharField(source='post.author.username')
  account_profile_pic = serializers.CharField(source='post.author.profilePic.url')
  post_likes = serializers.ReadOnlyField()

  class Meta:
    model = Saved
    fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Like
    fields = '__all__'