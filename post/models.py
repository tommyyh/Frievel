from django.db import models
from user.models import Account

class Post(models.Model):
  content = models.TextField()
  file = models.FileField(upload_to='media/post/', blank=True, null=True)
  published_at = models.DateField(auto_now_add=True)
  likes = models.IntegerField(default=0)
  author = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)

  def __str__(self):
    return self.content

class Saved(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True)
  account = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True)

  def __str__(self):
    return self.post.content

  @property
  def post_file(self):
    return '' if not self.post.file else self.post.file.url