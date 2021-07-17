from rest_framework import serializers
from .models import Direct_message

class Direct_message_serializer(serializers.ModelSerializer):
  person1_name = serializers.CharField(source='person_1.name')
  person2_name = serializers.CharField(source='person_2.name')
  person1_username = serializers.CharField(source='person_1.username')
  person2_username = serializers.CharField(source='person_2.username')
  person1_profilePic = serializers.CharField(source='person_1.profilePic.url')
  person2_profilePic = serializers.CharField(source='person_2.profilePic.url')

  class Meta:
    model = Direct_message
    fields = '__all__'

  def create(self, validated_data):
    return Direct_message.objects.create(**validated_data)