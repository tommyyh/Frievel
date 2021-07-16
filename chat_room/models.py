from django.db import models
from user.models import Account

class Direct_message(models.Model):
  person_1 = models.ForeignKey(
    Account, null=True, on_delete=models.PROTECT, related_name='person1'
  )
  person_2 = models.ForeignKey(
    Account, null=True, on_delete=models.PROTECT, related_name='person2'
  )

  def __str__(self):
    return f'{self.person_1} {self.person_2}'