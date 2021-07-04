from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer
import bcrypt

@api_view(['POST'])
def register(request):
  raw_password = bytes(request.data['password'], encoding='utf-8')
  hashedPassword = bcrypt.hashpw(raw_password, bcrypt.gensalt())
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
    print(serializer.errors)
    return Response({ 'status': 403 })