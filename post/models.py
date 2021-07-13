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

  @property
  def post_comments(self):
    return self.comment.all()

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

class Comment(models.Model):
  content = models.TextField()
  posted_at = models.DateField(auto_now_add=True)
  post = models.ForeignKey(
    Post, on_delete=models.CASCADE, related_name='comment', null=True
  )
  author = models.ForeignKey(
    Account, on_delete=models.CASCADE, related_name='comment', null=True
  )

  class Meta:
    ordering = ['-posted_at']

  def __str__(self):
      return self.content

  @property
  def comment_likes(self):
    return self.comment_like.count()
    
class Comment_like(models.Model):
  comment = models.ForeignKey(
    Comment, on_delete=models.CASCADE, related_name='comment_like', null=True
  )
  author = models.ForeignKey(
    Account, on_delete=models.CASCADE, related_name='comment_like', null=True
  )

  def __str__(self):
    return self.comment.content