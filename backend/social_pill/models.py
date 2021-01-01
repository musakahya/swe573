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