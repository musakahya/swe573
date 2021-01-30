from django.urls import path
from .views import currentUser, UserList

urlpatterns = [
    path('current_user/', currentUser),
    path('users/', UserList.as_view())
]