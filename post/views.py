from user.models import Account, Following
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostsSerializer

@api_view(['GET'])
def posts(request):
  account_id = request.session['user']['id']
  account = Account.objects.get(id = account_id)
  following = Following.objects.filter(account = account_id).values_list('username')
  posts = Post.objects.filter(author__username__in = [following, account.username])
  serializer = PostsSerializer(posts, many=True)

  return Response({ 'posts': serializer.data, 'status': 200 })

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