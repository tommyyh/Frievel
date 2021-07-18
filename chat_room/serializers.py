from rest_framework import serializers
from .models import Direct_message, Message

class Message_serializer(serializers.ModelSerializer):
  username = serializers.CharField(source='account.username')
  name = serializers.CharField(source='account.name')
  profilePic = serializers.CharField(source='account.profilePic.url')

  class Meta:
    model = Message
    fields = '__all__'

class Direct_message_serializer(serializers.ModelSerializer):
  person1_name = serializers.CharField(source='person_1.name')
  person2_name = serializers.CharField(source='person_2.name')
  person1_username = serializers.CharField(source='person_1.username')
  person2_username = serializers.CharField(source='person_2.username')
  person1_profilePic = serializers.CharField(source='person_1.profilePic.url')
  person2_profilePic = serializers.CharField(source='person_2.profilePic.url')
  message = Message_serializer(many=True, read_only=True)

  class Meta:
    model = Direct_message
    fields = '__all__'

  def create(self, validated_data):
    return Direct_message.objects.create(**validated_data)