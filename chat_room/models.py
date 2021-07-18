from django.db import models
from user.models import Account

class Direct_message(models.Model):
  person_1 = models.ForeignKey(
    Account, null=True, on_delete=models.PROTECT, related_name='person1'
  )
  person_2 = models.ForeignKey(
    Account, null=True, on_delete=models.PROTECT, related_name='person2'
  )
  chat_id = models.TextField(blank=True)
  seen = models.BooleanField(blank=True, null=True)

  def __str__(self):
    return self.person_1.name

class Message(models.Model):
  message = models.TextField()
  sentAt = models.DateTimeField(auto_now_add=True)
  account = models.ForeignKey(Account, on_delete=models.PROTECT, related_name='account')
  direct_message = models.ManyToManyField(Direct_message, related_name='message', blank=True)

  def __str__(self):
    return self.content