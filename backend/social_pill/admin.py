from django.contrib import admin
from .models import User, History

class UserAdmin(admin.ModelAdmin):
  list_display = ('first_name', 'last_name', 'email_address')

class HistoryAdmin(admin.ModelAdmin):
  list_display = ('email_address', 'search_term', 'date')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(History, HistoryAdmin)