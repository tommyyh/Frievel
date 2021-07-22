from chat_room.models import Direct_message
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Direct_message_serializer, Message_serializer
from user.models import Account
import uuid

@api_view(['GET'])
def message_user(request, username):
  user_id = request.session['user']['id']
  person_1 = Account.objects.get(id = user_id)
  person_2 = Account.objects.get(username = username)

  # Create direct message for both people
  chat_id = uuid.uuid4().int & (1<<64)-1
  serializer = Direct_message_serializer(data = {
    'person_1': person_1.id,
    'person_2': person_2.id,
    'person1_name': person_1.name,
    'person2_name': person_2.name,
    'person1_username': person_1.username,
    'person2_username': person_2.username,
    'person1_profilePic': person_1.profilePic.url,
    'person2_profilePic': person_2.profilePic.url,
    'chat_id': chat_id,
  })

  serializer2 = Direct_message_serializer(data = {
    'person_1': person_2.id,
    'person_2': person_1.id,
    'person1_name': person_2.name,
    'person2_name': person_1.name,
    'person1_username': person_2.username,
    'person2_username': person_1.username,
    'person1_profilePic': person_2.profilePic.url,
    'person2_profilePic': person_1.profilePic.url,
    'chat_id': chat_id,
  })

  if serializer.is_valid():
    serializer.save()

  if serializer2.is_valid():
    serializer2.save()

  direct_message = Direct_message.objects.get(
    person_1_id = person_1.id, person_2_id = person_2.id
  )
  serializer3 = Direct_message_serializer(direct_message)

  return Response({ 'status': 200, 'direct_message': serializer3.data })

@api_view(['GET'])
def get_user(request, chat_id):
  user_id = request.session['user']['id']

  try:
    direct_message = Direct_message.objects.get(chat_id = chat_id, person_1_id = user_id)
    serializer = Direct_message_serializer(direct_message)
    
    return Response({ 'status': 200, 'direct_msg': serializer.data })
  except:
    return Response({ 'status': 401 })

@api_view(['GET'])
def room_check(request, username):
  user_id = request.session['user']['id']

  try:
    account = Account.objects.get(username = username)
    direct_message = Direct_message.objects.get(
      person_1_id = user_id, person_2_id = account.id
    )

    return Response({ 'status': 200, 'chat_id': direct_message.chat_id })
  except:
    return Response({ 'status': 400 })

@api_view(['POST'])
def messages(request, id):
  user_id = request.session['user']['id']
  ammount = request.data['ammount']

  try:
    direct_message = Direct_message.objects.get(chat_id = id, person_1_id = user_id)
    messages = direct_message.message.all().order_by('-sentAt')[:ammount]
    serializer = Message_serializer(messages, many=True)

    return Response({
      'status': 200, 'messages': serializer.data, 'count': messages.count()
    })
  except:
    return Response({ 'status': 401 })

@api_view(['GET'])
def get_unread(request):
  user_id = request.session['user']['id']
  unread = Direct_message.objects.filter(person_1_id = user_id, seen = False).count()

  return Response({ 'status': 200, 'unread': unread })

@api_view(['GET'])
def seen(request, id):
  user_id = request.session['user']['id']
  
  try:
    direct_message = Direct_message.objects.get(person_1_id = user_id, chat_id = id)

    # Update
    direct_message.seen = True
    direct_message.save()

    unread = Direct_message.objects.filter(person_1_id = user_id, seen = False).count()

    return Response({ 'status': 200, 'unread': unread })
  except:
    return Response({ 'status': 404 })