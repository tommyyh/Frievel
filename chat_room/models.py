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

  def __str__(self):
    return self.person_1.name