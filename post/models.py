from django.db import models
from user.models import Account

class Post(models.Model):
  content = models.TextField()
  file = models.TextField(blank=True, null=True)
  published_at = models.DateField(auto_now_add=True)
  likes = models.IntegerField(default=0)
  author = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)

  def __str__(self):
    return self.content