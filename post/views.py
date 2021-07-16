from user.models import Account, Following
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Comment_like, Post, Saved, Like, Comment
from .serializers import PostsSerializer, SavedSerializer, LikeSerializer, CommentSerializer, CommentLikeSerializer

@api_view(['GET'])
def posts(request):
  # Get following user's posts
  # account_id = request.session['user']['id']
  # following = Following.objects.filter(account = account_id, ).values_list('username')
  # posts = Post.objects.filter(author__username__in = following)
  # serializer = PostsSerializer(posts, many=True)

  return Response({ 'posts': [], 'status': 200 })

@api_view(['GET'])
def saved(request):
  account_id = request.session['user']['id']
  saved = Saved.objects.filter(account_id = account_id)
  serializer = SavedSerializer(saved, many=True)

  return Response({ 'status': 200, 'posts': serializer.data })

@api_view(['POST'])
def save_post(request):
  post_id = request.data['id']
  post = Post.objects.get(id = post_id)
  account = Account.objects.get(id = request.session['user']['id'])

  # Save post
  serializer = SavedSerializer(data = {
    'post': post_id,
    'account': account.id,
    'post_content': post.content,
    'post_file': '' if not post.file else post.file.url,
    'post_published_at': post.published_at,
    'account_name': account.name,
    'account_username': account.username,
    'account_profile_pic': account.profilePic.url,
  })

  if serializer.is_valid():
    serializer.save()

  return Response({ 'status': 200 })

@api_view(['POST'])
def unsave_post(request):
  id = request.data['id']
  post = Post.objects.get(id = id)
  user_id = request.session['user']['id']
  saved_post = Saved.objects.get(id = post.saved.first().id, account_id = user_id)

  # Unsave post
  saved_post.delete()

  return Response({ 'status': 200 })

@api_view(['POST'])
def new_post(request):
  account_id = request.session['user']['id']
  author = Account.objects.get(id = account_id)
  content = request.data['content']
  file = request.data['file']
  
  if not file:
    serializer = PostsSerializer(data = {
      'content': content,
      'author': account_id,
      'author_name': author.name,
      'author_username': author.username,
      'author_profile_pic': author.profilePic.url,
    })
  else:
    serializer = PostsSerializer(data = {
      'content': content,
      'file': file,
      'author': account_id,
      'author_name': author.name,
      'author_username': author.username,
      'author_profile_pic': author.profilePic.url,
    })

  if serializer.is_valid():
    serializer.save()

    return Response({ 'status': 201, 'new_post': serializer.data })
  else:
    return Response({ 'status': 400 })

@api_view(['POST'])
def check_if_saved(request):
  id = request.data['id']
  user_id = request.session['user']['id']
  saved_posts = Saved.objects.filter(post_id = id, account_id = user_id)

  if not saved_posts:
    return Response({ 'status': 404 })
  else:
    return Response({ 'status': 200 })

@api_view(['POST'])
def like_post(request):
  id = request.data['id']
  user_id = request.session['user']['id']
  account = Account.objects.get(id = user_id)
  post = Post.objects.get(id = id)

  # Like post
  serializer = LikeSerializer(data = {
    'author': account.id,
    'post': post.id,
  })

  if serializer.is_valid():
    serializer.save()

  return Response({ 'status': 200 })

@api_view(['POST'])
def unlike_post(request):
  id = request.data['id']
  user_id = request.session['user']['id']
  like = Like.objects.filter(post_id = id, author_id = user_id).first()

  # Remove like
  like.delete()

  return Response({ 'status': 200 })

@api_view(['POST'])
def unlike_comment(request):
  id = request.data['id']
  user_id = request.session['user']['id']
  like = Comment_like.objects.filter(comment_id = id, author_id = user_id).first()

  # Remove like
  like.delete()

  return Response({ 'status': 200 })

@api_view(['POST'])
def check_if_liked(request):
  user_id = request.session['user']['id']
  id = request.data['id']
  post = Post.objects.get(id = id)
  post_likes = post.like.all().values_list('author_id')
  user = Account.objects.filter(id = user_id, id__in = post_likes)

  if not user:
    return Response({ 'status': 404 })
  else:
    return Response({ 'status': 200 })

@api_view(['POST'])
def comment_check_if_liked(request):
  user_id = request.session['user']['id']
  id = request.data['id']
  comment = Comment.objects.get(id = id)
  post_likes = comment.comment_like.all().values_list('author_id')
  user = Account.objects.filter(id = user_id, id__in = post_likes)

  if not user:
    return Response({ 'status': 404 })
  else:
    return Response({ 'status': 200 })

@api_view(['POST'])
def delete(request):
  id = request.data['id']
  post = Post.objects.filter(id = id)

  # Delete post
  post.delete()

  return Response({ 'status': 200 })

@api_view(['GET'])
def info(request, id):
  try:
    post = Post.objects.get(id = id)
    serializer = PostsSerializer(post)

    return Response({ 'status': 200, 'post': serializer.data })
  except:
    return Response({ 'status': 404 })

@api_view(['POST'])
def new_comment(request):
  # Save comment
  content = request.data['content']
  id = request.data['id']
  user_id = request.session['user']['id']
  account = Account.objects.get(id = user_id)
  serializer = CommentSerializer(data = {
    'author': account.id,
    'post': id,
    'content': content,
    'author_name': account.name,
    'author_username': account.username,
    'author_profile_pic': account.profilePic.url,
  })
  
  if serializer.is_valid():
    serializer.save()

  # Send back
  comments = Comment.objects.all()
  comment_serializer = CommentSerializer(comments, many=True)

  return Response({ 'status': 200, 'all_comments': comment_serializer.data })

@api_view(['POST'])
def like_comment(request):
  id = request.data['id']
  user_id = request.session['user']['id']
  account = Account.objects.get(id = user_id)
  comment = Comment.objects.get(id = id)

  # Like post
  serializer = CommentLikeSerializer(data = {
    'author': account.id,
    'comment': comment.id,
  })

  if serializer.is_valid():
    serializer.save()

  return Response({ 'status': 200 })