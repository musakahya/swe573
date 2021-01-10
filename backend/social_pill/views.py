## import essential packages
import json
import tweepy
import re
import numpy as np
import os
from wordcloud import WordCloud, STOPWORDS
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from datetime import date, datetime

## import models and serializers
from .models import History, Tweet
from .serializers import HistorySerializer, UserSerializer, UserSerializerWithToken

## import rest_framework
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

def search(request):
  data = []
  tweetObjects = []
  auth = tweepy.AppAuthHandler(os.getenv('TW_SECRET_ID'), os.getenv('TW_SECRET_KEY'))
  api = tweepy.API(auth)
  res = tweepy.Cursor(
    api.search, 
    q=request.GET.get('q', None).split('/?u=')[0],
    lang='en',
    count=10
    ).items(10)

  for tweet in res:
    data.append(tweet._json)
  
  #Extract textfields from tweets
  raw_tweets = []
  for tweets in data:
    raw_tweets.append(tweets['text'])
    tweetObjects.append(
      Tweet(
        user=request.GET.get('q', None).split('/?u=')[1],
        search_term=request.GET.get('q', None).split('/?u=')[0],
        date=datetime.now(),
        tweet_text=tweets['text'],
        tweet_entities=tweets['entities'],
        tweet_id=tweets["id"],
        tweet_date=tweets["created_at"]
      )
    )
  
  raw_string = ''.join(raw_tweets)
  no_links = re.sub(r'http\S+', '', raw_string)
  no_unicode = re.sub(r"\\[a-z][a-z]?[0-9]+", '', no_links)
  no_special_characters = re.sub('[^A-Za-z ]+', '', no_unicode)

  words = no_special_characters.split(" ")
  words = [w for w in words if len(w) > 2]  # ignore a, an, be, ...
  words = [w.lower() for w in words]
  words = [w for w in words if w not in STOPWORDS]

  ## Add history

  History.objects.create(
            email_address=request.GET.get('q', None).split('/?u=')[1],
            search_term=request.GET.get('q', None).split('/?u=')[0],
            date=date.today(),
        )

  Tweet.objects.bulk_create(tweetObjects)
  
  return JsonResponse({'response':data, 'words': words})

@api_view(('POST', 'GET'))
@csrf_exempt
def history(request):
  if request.method == 'POST':
    payload = json.loads(request.body)
    try:
        history = History.objects.create(
            email_address=payload["email_address"],
            search_term=payload["search_term"],
            date=payload["date"],
        )
        serializer = HistorySerializer(history)
        return JsonResponse({'history': serializer.data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  elif request.method == 'GET':
    history = History.objects.filter(email_address=request.user)
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)

@api_view(('POST', 'GET'))
@csrf_exempt
def tweet(request):
  if request.method == 'GET':
    tweets = Tweet.objects.filter(user=request.user).count()
    return Response(tweets)


@api_view(['GET'])
@csrf_exempt
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        
        serializer = UserSerializerWithToken(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)