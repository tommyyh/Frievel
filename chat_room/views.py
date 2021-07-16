from chat_room.models import Direct_message
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Direct_message_serializer
from user.models import Account

@api_view(['GET'])
def message_user(request, username):
  user_id = request.session['user']['id']
  person_1 = Account.objects.get(id = user_id)
  person_2 = Account.objects.get(username = username)

  # Create direct message
  serializer = Direct_message_serializer(data = {
    'person_1': person_1.id,
    'person_2': person_2.id,
    'person1_name': person_1.name,
    'person2_name': person_2.name,
    'person1_username': person_1.username,
    'person2_username': person_2.username,
    'person1_profilePic': person_1.profilePic.url,
    'person2_profilePic': person_2.profilePic.url,
  })

  if serializer.is_valid():
    # serializer.save()
    print('fe')

  direct_message = Direct_message.objects.get(
    person_1_id = person_1.id, person_2_id = person_2.id
  )
  serializer2 = Direct_message_serializer(direct_message)

  return Response({ 'status': 200, 'direct_message': serializer2.data })