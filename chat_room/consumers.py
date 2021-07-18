import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Message, Direct_message
from user.models import Account

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_id = self.scope['url_route']['kwargs']['room_id']
    self.room_group_name = f'chat_{self.room_id}'

    # Join room
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )

    await self.accept()

  async def disconnect(self, code):
    # Disconnect from the room
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )

  async def receive(self, text_data):
    data = json.loads(text_data)
    message = data['message']
    username = data['username']
    name = data['name']
    profilePic = data['profilePic']
    sentAt = data['sentAt']
    room = data['room_id']

    # Save message
    await self.store_message(username, room, message)

    await self.channel_layer.group_send(
      self.room_group_name, {
        'type': 'chat_message',
        'message': message,
        'username': username,
        'name': name,
        'profilePic': profilePic,
        'sentAt': sentAt,
      }
    )

  async def chat_message(self, event):
    message = event['message']
    username = event['username']
    name = event['name']
    profilePic = event['profilePic']
    sentAt = event['sentAt']

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
      'message': message,
      'username': username,
      'name': name,
      'profilePic': profilePic,
      'sentAt': sentAt,
    }))

  @sync_to_async
  def store_message(self, username, room, message):
    user = Account.objects.get(username = username)
    direct_message = Direct_message.objects.filter(chat_id = room)
    receiver_chat = Direct_message.objects.filter(
      chat_id = room
    ).exclude(person_1_id = user.id).first()

    # Update seen value
    receiver_chat.seen = False
    receiver_chat.save()

    # Save message
    new_msg = Message(
      message = message,
      account = user,
    )

    new_msg.save()

    # Add many to many filed
    for x in direct_message:
      new_msg.direct_message.add(x)