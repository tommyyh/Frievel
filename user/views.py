from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer, FollowingSerializer
from .models import Account, Following
from post.models import Post
from post.serializers import PostsSerializer
import bcrypt
import jwt
import random
import os

@api_view(['POST'])
def register(request):
  raw_password = bytes(request.data['password'], encoding='utf-8')
  hashedPassword = bcrypt.hashpw(raw_password, bcrypt.gensalt())

  # Check if username is taken
  if Account.objects.filter(username = request.data['username']):
    return Response({ 'status': 400, 'msg': 'Username is already taken' })

  # Check if email is taken
  if Account.objects.filter(email = request.data['email']):
    return Response({ 'status': 400, 'msg': 'Email is already taken' })

  # Check if password is at least 6 letters
  if not len(request.data['password']) > 5:
    return Response({
      'status': 400, 'msg': 'Password must be at least 6 characters long' 
    })

  # Save user to the database
  serializer = AccountSerializer(data = {
    'name': request.data['fullName'],
    'email': request.data['email'],
    'password': hashedPassword.decode('utf-8'),
    'username': request.data['username'],
  })
  
  if serializer.is_valid():
    serializer.save()

    return Response({ 'status': 201 })
  else:
    return Response({ 
      'status': 403, 'msg': 'There was an error creating your account' 
    })

@api_view(['POST'])
def login(request):
  email = request.data['email']
  password = bytes(request.data['password'], encoding='utf-8')
  account = Account.objects.filter(email = email).first()

  # Check if account exists
  if not account or email == os.environ.get('EMAIL'):
    return Response({ 'status': 404, 'msg': 'Please enter a valid email' })

  # Check if password matches
  if bcrypt.checkpw(password, bytes(account.password, encoding='utf-8')):
    payload = {
      'id': account.id,
      'name': account.name,
      'username': account.username,
      'email': account.email,
      'profile_pic': account.profilePic,
    }

    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')

    # Send token to cookies
    response = Response({
        'status': 201,
        'name': account.name,
        'username': account.username,
        'email': account.email,
        'profile_pic': account.profilePic,
      })
    response.set_cookie('token', encoded_jwt, max_age=None, httponly=True)

    # Save user to session
    request.session['user'] = payload

    return response
  else:
    return Response({ 'status': 400, 'msg': 'Incorrect password' })

@api_view(['DELETE'])
def logout(request):
  response = Response({ 'status': 200 })
  response.set_cookie('token', '', max_age=1, httponly=True)

  return response

@api_view(['GET'])
def suggestions(request):
  # Send random suggestions
  last = Account.objects.count() + 1
  random_list = random.sample(range(1, last), 7)
  accounts = Account.objects.filter(pk__in = random_list)
  serializer = AccountSerializer(accounts, many=True) 

  return Response({ 'suggestions': serializer.data })

@api_view(['GET'])
def authenticate(request):
  if 'token' in request.COOKIES:
    encoded_token = request.COOKIES['token']

    try:
      token = jwt.decode(encoded_token, 'secret', algorithms="HS256")

      request.session['user'] = token

      return Response({
        'status': 201,
        'name': token['name'],
        'username': token['username'],
        'email': token['email'],
        'profile_pic': token['profile_pic'],
      })

    except:
      return Response({
        'status': 401,
      })

  else:
    return Response({
      'status': 401,
    })

@api_view(['POST'])
def follow(request):
  username = request.data['username']
  user = request.session['user']
  followed_account = Account.objects.get(username = username)
  user_account = Account.objects.get(id = user['id'])

  # Add followed user
  serializer = FollowingSerializer(data = {
    'name': followed_account.name,
    'username': followed_account.username,
    'profilePic': followed_account.profilePic,
    'account': user_account.id,
  })

  # Adjust follower & following count
  user_account.following_count += 1
  user_account.save()

  followed_account.follower_count += 1
  followed_account.save()

  if serializer.is_valid():
    serializer.save()

  return Response({ 'status': 200 })

@api_view(['GET'])
def profile(request, username):
  account = Account.objects.filter(username = username).first()

  if not account:
    return Response({ 'status': 404 })

  posts = Post.objects.filter(author_id = account.id)
  serializer = AccountSerializer(account)
  post_serializer = PostsSerializer(posts, many=True)

  return Response({
    'status': 200, 'profile': serializer.data, 'profilePosts': post_serializer.data
  })