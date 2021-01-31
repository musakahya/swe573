
import tweepy
import os

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