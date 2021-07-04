from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer
from .models import Account
from validate_email import validate_email
import bcrypt

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

  # Check if email exists
  if not validate_email(request.data['email'], verify=True):
    return Response({ 'status': 400, 'msg': 'Please enter a valid email' })

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
  return Response(request.data)