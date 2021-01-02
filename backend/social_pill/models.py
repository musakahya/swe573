from django.db import models
# Create your models here.

class User(models.Model):
  first_name = models.TextField()
  last_name = models.TextField()
  email_address = models.TextField()

  def _str_(self):
    return self.email_address

class History(models.Model):
  email_address = models.TextField()
  search_term = models.TextField()
  date = models.DateField(auto_now_add=True)

  def _str_(self):
    return self.search_term

class Tweet(models.Model):
  user = models.TextField()
  search_term = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  tweet_text = models.TextField()
  tweet_entities = models.TextField()
  tweet_id = models.TextField()
  tweet_date = models.TextField()

  def _str_(self):
    return self.id