from user.models import Following
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