## import essential packages
import json
import tweepy
import re
import os
from wordcloud import WordCloud, STOPWORDS
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from datetime import date, datetime
from textblob import TextBlob
from django.db.models import Max
from collections import Counter

## import models and serializers
from .models import History, Tweet
from .serializers import HistorySerializer, UserSerializer, UserSerializerWithToken, TweetSerializer

## import rest_framework
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

## import libraries for the cooccurrence graph
import itertools
import collections
import nltk
from nltk import bigrams
from nltk.corpus import stopwords

global_data = []

def retrieveTweetsFromDatabase(keyword):
  response = Tweet.objects.filter(search_term=keyword)
  tweets = TweetSerializer(response, many=True)
  arr = [tweets.data, response.aggregate(Max('tweet_id'))]
  return arr

def saveNewTweetsIntoDatabase(data, user, search_term):
  tweetObjects = []
  for tweets in data:
    tweetObjects.append(
      Tweet(
        user=user,
        search_term=search_term,
        date=datetime.now(),
        tweet_text=tweets['text'],
        tweet_entities=tweets['entities'],
        tweet_id=tweets["id"],
        tweet_date=tweets["created_at"],
        tweet_json=json.dumps(tweets)
      )
    )
  Tweet.objects.bulk_create(tweetObjects)

def getTextFromTweet(data):
  raw_tweets = []
  for tweet in data:
    raw_tweets.append(tweet["text"])
  return raw_tweets

def cleanTweets(raw_tweets):
  raw_string = ''.join(raw_tweets)
  no_links = re.sub(r'http\S+', '', raw_string)
  no_unicode = re.sub(r"\\[a-z][a-z]?[0-9]+", '', no_links)
  no_special_characters = re.sub('[^A-Za-z ]+', '', no_unicode)
  return no_special_characters

def remove_url(txt):
    """Replace URLs found in a text string with nothing 
    (i.e. it will remove the URL from the string).

    Parameters
    ----------
    txt : string
        A text string that you want to parse and remove urls.

    Returns
    -------
    The same txt string with url's removed.
    """
    
    url_pattern = re.compile(r'https?://\S+|www\.\S+')
    no_url = url_pattern.sub(r'', txt)

    return no_url

def saveHistory(request):
  History.objects.create(
            email_address=request.GET.get('q', None).split('/?u=')[1],
            search_term=request.GET.get('q', None).split('/?u=')[0],
            date=date.today(),
  )

def findWords(clean_tweets):
  words = clean_tweets.split(" ")
  words = [w for w in words if len(w) > 2]  # ignore a, an, be, ...
  words = [w.lower() for w in words]
  words = [w for w in words if w not in STOPWORDS]
  return words

def findMostCommonWords(lst):
    data = Counter(lst)
    return data.most_common(3)

def queryTwitter(q, maxId):
  auth = tweepy.AppAuthHandler(os.getenv('TW_SECRET_ID'), os.getenv('TW_SECRET_KEY'))
  api = tweepy.API(auth)
  res = tweepy.Cursor(
    api.search, 
    q=q + ' -filter:retweets',
    lang='en',
    count=100,
    since_id=maxId
    ).items(100)
  return res

def search(request):

  # who is searching
  user=request.GET.get('q', None).split('/?u=')[1]

  # what is being searched
  search_term=request.GET.get('q', None).split('/?u=')[0]
  
  dbTweets = retrieveTweetsFromDatabase(request.GET.get('q', None).split('/?u=')[0])
  
  ## data dictionary is the container for tweets coming from the database and the Twitter API for the given search term
  data = []
  global_data = []

  ## Add tweets coming from the database into data dictionary
  for tweet in dbTweets[0]:
    data.append(json.loads(tweet["tweet_json"]))

  ## Query Twitter API for the given search term
  res = queryTwitter(request.GET.get('q', None).split('/?u=')[0], dbTweets[1])

  ## Add tweets coming from Twitter into the new_tweets dictionary
  new_tweets = []
  for tweet in res:
    new_tweets.append(tweet._json)

  ## Merge new_tweets with the data dictionary
  for item in new_tweets:
    data.append(item)

  ## Save new tweets into the database
  saveNewTweetsIntoDatabase(new_tweets, user, search_term)

  ## Get text attribute from the Tweet object
  raw_tweets = getTextFromTweet(data)

  ## Clean tweets
  clean_tweets = cleanTweets(raw_tweets)

  ## Find words
  words = findWords(clean_tweets)

  ## Save new search into the history table
  saveHistory(request)

  data = sorted(data, key=lambda k: k['id'], reverse=True) 

  global_data = data

  return JsonResponse({'response':data[:1000], 'words': words})

@csrf_exempt
def cooccurrence(request):
  
  ## Get text attribute from the Tweet object
  raw_tweets = json.loads(request.body.decode('utf-8'))["tweets"]

  # Remove URLs
  tweets_no_urls = [remove_url(tweet) for tweet in raw_tweets]

  # Create a sublist of lower case words for each tweet
  words_in_tweet = [tweet.lower().split() for tweet in tweets_no_urls]

  # Download stopwords
  nltk.download('stopwords')
  stop_words = set(stopwords.words('english'))

  # Remove stop words from each tweet list of words
  tweets_nsw = [[word for word in tweet_words if not word in stop_words]
              for tweet_words in words_in_tweet]

  # Remove mentions and short words with one or two letters from each tweet list of words
  tweets_nsw = [[word for word in tweet_words if not word.startswith('@') and len(word) > 2]
              for tweet_words in words_in_tweet]

  # Create list of lists containing bigrams in tweets
  terms_bigram = [list(bigrams(tweet)) for tweet in tweets_nsw]

  # Flatten list of bigrams in clean tweets
  bigrams2 = list(itertools.chain(*terms_bigram))

  # Create counter of words in clean bigrams
  bigram_counts = collections.Counter(bigrams2)

  return JsonResponse({'bigram': bigram_counts.most_common(50)})


@csrf_exempt
def sentiment(request):
  neg = []
  pos= []  
  neut = []
  for tweet in json.loads(request.body.decode('utf-8'))["tweets"]:
    blob = TextBlob(tweet)
    if blob.sentiment.polarity < 0:         #Negative
      neg.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})
    elif blob.sentiment.polarity == 0:      #Neutral
      neut.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})
    else:                                   #Positive
      pos.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})

  return JsonResponse({'neg': neg, 'pos': pos, 'neut': neut})

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
    try:
      history = History.objects.filter(email_address=request.user).order_by('-date')
      serializer = HistorySerializer(history, many=True)
      return Response(serializer.data)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(('POST', 'GET'))
@csrf_exempt
def tweet(request):
  if request.method == 'GET':
    tweets = Tweet.objects.filter(user=request.user).count()
    return Response(tweets)


@api_view(['POST', 'GET'])
@csrf_exempt
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    print("hereee")
    serializer = UserSerializer(request.user)
    print(request.user)
    print(serializer.data)
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