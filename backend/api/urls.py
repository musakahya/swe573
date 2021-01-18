"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from social_pill.views import search, history, tweet, sentiment, cooccurrence, current_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('api/search/', search, name="search"),
    path('api/history/', history, name="history"),
    path('api/tweet/', tweet, name="tweet"),
    path('api/sentiment/', sentiment, name="sentiment"),
    path('api/cooccurrence/', cooccurrence, name="cooccurrence"),
    #path('social_pill/', include('social_pill.urls')),
    path('social_pill/current_user', current_user, name="current_user")
]
