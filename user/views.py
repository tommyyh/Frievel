from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer, FollowingSerializer
from .models import Account, Following
from post.models import Post
from post.serializers import PostsSerializer
from chat_room.models import Direct_message
from chat_room.serializers import Direct_message_serializer
import bcrypt
import jwt
import random
from decouple import config

@api_view(['POST'])
def register(request):
  raw_password = bytes(request.data['password'], encoding='utf-8')
  hashedPassword = bcrypt.hashpw(raw_password, bcrypt.gensalt())

  if not request.data['fullName'] and not request.data['email'] and not request.data['password'] and not request.data['username']:
    return Response({ 'status': 400, 'msg': 'Please fill out all fields' })

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
    'profilePic': request.data['profilePic'],
  })
  
  if serializer.is_valid():
    serializer.save()

    return Response({ 'status': 201 })
  else:
    print(serializer.errors)

    return Response({ 
      'status': 403, 'msg': 'There was an error creating your account' 
    })

@api_view(['POST'])
def login(request):
  email = request.data['email']
  password = bytes(request.data['password'], encoding='utf-8')
  account = Account.objects.filter(email = email).first()

  if not request.data['password'] and not request.data['email']:
    return Response({ 'status': 400, 'msg': 'Please fill out all fields' })

  # Check if account exists
  if not account or email == config('EMAIL'):
    return Response({ 'status': 404, 'msg': 'Please enter a valid email' })

  # Check if password matches
  if bcrypt.checkpw(password, bytes(account.password, encoding='utf-8')):
    profile_pic = '' if not account.profilePic else account.profilePic.url
    payload = {
      'id': account.id,
      'name': account.name,
      'username': account.username,
      'email': account.email,
      'profile_pic': profile_pic,
    }

    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')

    # Send token to cookies
    response = Response({
        'status': 201,
        'name': account.name,
        'username': account.username,
        'email': account.email,
        'profile_pic': profile_pic,
      })
    response.set_cookie('token', encoded_jwt, max_age=None, httponly=True)

    # Save user to session
    request.session['user'] = payload
    request.session.modified = True

    return response
  else:
    return Response({ 'status': 400, 'msg': 'Incorrect password' })

@api_view(['DELETE'])
def logout(request):
  response = Response({ 'status': 200 })
  response.delete_cookie('token')

  return response

@api_view(['GET'])
def suggestions(request):
  # Send random suggestions
  last = Account.objects.count() + 1
  random_list = random.sample(range(1, 8), 7)
  accounts = Account.objects.filter(pk__in = random_list)
  serializer = AccountSerializer(accounts, many=True) 

  return Response({ 'suggestions': serializer.data })

@api_view(['GET'])
def authenticate(request):
  if 'token' in request.COOKIES:
    encoded_token = request.COOKIES['token']

    try:
      token = jwt.decode(encoded_token, 'secret', algorithms="HS256")
      account = Account.objects.get(id = token['id'])

      request.session['user'] = token

      return Response({
        'status': 201,
        'name': account.name,
        'username': account.username,
        'email': account.email,
        'profile_pic': account.profilePic.url,
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
    'profilePic': followed_account.profilePic.url,
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

@api_view(['POST'])
def unfollow(request):
  username = request.data['username']
  user = request.session['user']
  followed_account = Account.objects.get(username = username)
  user_account = Account.objects.get(id = user['id'])

  # Remove account from followed
  Following.objects.filter(username = username).delete()

  # Adjust follower & following count
  user_account.following_count -= 1
  user_account.save()

  followed_account.follower_count -= 1
  followed_account.save()

  return Response({ 'status': 200 })

@api_view(['GET'])
def profile(request, username):
  try:
    account = Account.objects.get(username = username)
    posts = Post.objects.filter(author_id = account.id)
    serializer = AccountSerializer(account)
    post_serializer = PostsSerializer(posts, many=True)

    return Response({
      'status': 200, 'profile': serializer.data, 'profilePosts': post_serializer.data
    })
  except:
    return Response({ 'status': 404 })

@api_view(['GET'])
def following(request, username):
  account_id = request.session['user']['id'] if 'user' in request.session else None
  currently_following = Following.objects.filter(
    account_id = account_id, username = username
  )
  account_followed = 'false' if not currently_following else 'true'

  return Response({ 'account_followed': account_followed })

@api_view(['POST'])
def updateProfile(request, username):
  lives_in = request.data['livesIn'] if request.data['livesIn'] else ''
  born_in = request.data['bornIn'] if request.data['bornIn'] else ''
  profile_img = '' if not request.data['profileImg'] else request.data['profileImg']
  account = Account.objects.get(username = username)

  # Update profile
  account.lives_in = lives_in
  account.born_in = born_in

  if account.profilePic.name != 'media/profile/default_profile.jpg':
    account.profilePic.delete()

  account.profilePic = profile_img
  account.save()

  # Send back the updated data
  updated_account = Account.objects.get(username = username)
  serializer = AccountSerializer(updated_account)

  return Response({ 'status': 200, 'profile': serializer.data })

@api_view(['GET'])
def my_messages(request):
  user_id = request.session['user']['id']
  direct_message = Direct_message.objects.filter(person_1_id = user_id).order_by('seen')
  serializer = Direct_message_serializer(direct_message, many=True)

  return Response({ 'status': 200, 'messages': serializer.data })