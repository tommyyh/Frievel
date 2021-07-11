from user.models import Account, Following
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostsSerializer

@api_view(['GET'])
def posts(request):
  account_id = request.session['user']['id']
  following = Following.objects.filter(account = account_id).values_list('name')
  posts = Post.objects.filter(author__name__in = following)
  serializer = PostsSerializer(posts, many=True)

  return Response({ 'posts': serializer.data, 'status': 200 })

@api_view(['POST'])
def new_post(request):
  account_id = request.session['user']['id']
  author = Account.objects.get(id = account_id)
  content = request.data['content']
  file = request.data['file']
  
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
  else:
    print(serializer.errors)

  return Response('nigga')