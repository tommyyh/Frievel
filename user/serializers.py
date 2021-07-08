from django.db import models
from rest_framework import serializers
from .models import Account, Following

class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = '__all__'

class FollowingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Following
    fields = '__all__'