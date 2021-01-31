
import tweepy
import os

def queryTwitter(q, maxId, count):
  auth = tweepy.AppAuthHandler(os.getenv('TW_SECRET_ID'), os.getenv('TW_SECRET_KEY'))
  api = tweepy.API(auth)
  res = tweepy.Cursor(
    api.search, 
    q=q + ' -filter:retweets',
    lang='en',
    count=count,
    since_id=maxId
    ).items(count)
  return res

def queryTwitterForTest():
  auth = tweepy.AppAuthHandler(os.getenv('TW_SECRET_ID'), os.getenv('TW_SECRET_KEY'))
  api = tweepy.API(auth)
  res = tweepy.Cursor(
    api.search, 
    q='covid -filter:retweets',
    lang='en',
    count=1,
    ).items(1)
  return res