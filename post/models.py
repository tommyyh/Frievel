from django.db import models
from user.models import Account

class Post(models.Model):
  content = models.TextField()
  file = models.FileField(upload_to='media/post/', blank=True, null=True)
  published_at = models.DateField(auto_now_add=True)
  author = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)

  class Meta:
    ordering = ['-published_at']

  def __str__(self):
    return self.content

  @property
  def post_likes(self):
    return self.like.count()

class Saved(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, related_name='saved')
  account = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True, related_name='saved')

  def __str__(self):
    return self.post.content

  @property
  def post_file(self):
    return '' if not self.post.file else self.post.file.url

  @property
  def post_likes(self):
    return self.post.like.count()

class Like(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='like', null=True)
  author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='like', null=True)

  def __str__(self):
    return self.post.content