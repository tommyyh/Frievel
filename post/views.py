from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from user.models import Account
from .serializers import PostsSerializer

@api_view(['GET'])
def posts(request):
  posts = Post.objects.all()
  serializer = PostsSerializer(posts, many=True)

  return Response({ 'posts': serializer.data, 'status': 200 })