## Essential packages
import json
import os
from wordcloud import WordCloud, STOPWORDS
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from textblob import TextBlob
from rest_framework import permissions
from django.db.models import Count

## Models and serializers
from .models import History, Tweet
from .serializers import HistorySerializer, UserSerializer, UserSerializerWithToken, TweetSerializer
from django.contrib.auth.models import User

## Rest framework
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

## Libraries for the cooccurrence graph
import itertools
import collections
import nltk
from nltk import bigrams
from nltk.corpus import stopwords

## Database functions
from social_pill.functions.database.database import retrieveTweetsFromDatabase, saveNewTweetsIntoDatabase, saveHistory, queryDatabaseByDate

## Helper functions
from social_pill.functions.helper.helper import getTextFromTweet, findWords

## Data cleaning functions
from social_pill.functions.data_cleaning.data_cleaning import removeUrl, cleanTweets

## Helper functions
from social_pill.functions.twitter.twitter import queryTwitter


globalData = []

def search(request):

  try:

    # who is searching
    user=request.GET.get('q', None).split('/?u=')[1]

    # what is being searched
    searchTerm=request.GET.get('q', None).split('/?u=')[0]
    
    dbTweets = retrieveTweetsFromDatabase(request.GET.get('q', None).split('/?u=')[0])
    
    ## data dictionary is the container for tweets coming from the database and the Twitter API for the given search term
    data = []
    globalData = []

    ## Add tweets coming from the database into data dictionary
    for tweet in dbTweets[0]:
      data.append(json.loads(tweet["tweet_json"]))

    ## Query Twitter API for the given search term
    res = queryTwitter(request.GET.get('q', None).split('/?u=')[0], dbTweets[1], 100)

    ## Add tweets coming from Twitter into the new_tweets dictionary
    newTweets = []
    for tweet in res:
      newTweets.append(tweet._json)

    ## Merge new_tweets with the data dictionary
    for item in newTweets:
      data.append(item)

    ## Save new tweets into the database
    saveNewTweetsIntoDatabase(newTweets, user, searchTerm)

    ## Get text attribute from the Tweet object
    rawTweets = getTextFromTweet(data)

    ## Clean tweets
    cleanTweetsList = cleanTweets(rawTweets)

    ## Find words
    words = findWords(cleanTweetsList)

    ## Save new search into the history table
    saveHistory(request)

    data = sorted(data, key=lambda k: k['id'], reverse=True) 

    globalData = data

    return JsonResponse({'response':data[:2500], 'words': words})

  except Exception as e:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def searchTweetsByDate(request):

  startDate = json.loads(request.body)["startDate"]

  endDate = json.loads(request.body)["endDate"]
  
  dbTweets = queryDatabaseByDate(request.GET.get('q', None).split('/?u=')[0], startDate, endDate)

  data = []

  ## Add tweets coming from the database into data dictionary
  for tweet in dbTweets:
    data.append(json.loads(tweet[0]))

  ## Get text attribute from the Tweet object
  rawTweets = getTextFromTweet(data)

  ## Clean tweets
  cleanTweetsList = cleanTweets(rawTweets)

  ## Find words
  words = findWords(cleanTweetsList)

  data = sorted(data, key=lambda k: k['id'], reverse=True) 

  globalData = data

  return JsonResponse({'response':data[:2500], 'words': words})
  


@csrf_exempt
def cooccurrence(request):
  try:
    ## Get text attribute from the Tweet object
    rawTweets = json.loads(request.body.decode('utf-8'))["tweets"]

    # Remove URLs
    tweetsNoUrls = [removeUrl(tweet) for tweet in rawTweets]

    # Create a sublist of lower case words for each tweet
    wordsInTweet = [tweet.lower().split() for tweet in tweetsNoUrls]

    # Download stopwords
    nltk.download('stopwords')
    stopWords = set(stopwords.words('english'))

    # Remove stop words from each tweet list of words
    tweets_nsw = [[word for word in tweetWords if not word in stopWords]
                for tweetWords in wordsInTweet]

    # Remove mentions and short words with one or two letters from each tweet list of words
    tweetsNsw = [[word for word in tweetWords if not word.startswith('@') and len(word) > 2]
                for tweetWords in wordsInTweet]

    # Create list of lists containing bigrams in tweets
    termsBigram = [list(bigrams(tweet)) for tweet in tweetsNsw]

    # Flatten list of bigrams in clean tweets
    bigramsList = list(itertools.chain(*termsBigram))

    # Create counter of words in clean bigrams
    bigramCounts = collections.Counter(bigramsList)

    return JsonResponse({'bigram': bigramCounts.most_common(50)})

  except:
    return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def sentiment(request):
  try:
    negative = []
    positive= []  
    neutral = []
    for tweet in json.loads(request.body.decode('utf-8'))["tweets"]:
      blob = TextBlob(tweet)
      if blob.sentiment.polarity < 0:      
        negative.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})
      elif blob.sentiment.polarity == 0:   
        neutral.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})
      else:                                
        positive.append({"tweet": tweet, "polarity": round(blob.sentiment.polarity, 2)})

    return JsonResponse({'neg': negative, 'pos': positive, 'neut': neutral})

  except:
    return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    try:
      tweets = Tweet.objects.filter(user=request.user).count()
      totalTweets = Tweet.objects.count()
      mostTweet = Tweet.objects.annotate(num_search=Count('search_term')).order_by('-num_search')[:1]
      response = [tweets, totalTweets, mostTweet[0].search_term]
      return Response(response)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST', 'GET'])
@csrf_exempt
def currentUser(request):
    try:
      serializer = UserSerializer(request.user)
      return Response(serializer.data)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class UserList(APIView):

    permission_classes = (permissions.AllowAny,)
    http_method_names = ['get', 'head', 'post']

    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    def post(self, request, format=None):

      userData = request.data
      userData = json.loads(userData["body"])
      try:
        user = User.objects.create_user(userData["username"], userData["username"], userData["password"])
        user.save()
        return Response(status=status.HTTP_201_CREATED)
      except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)