from nltk.corpus import stopwords
# from wordcloud import STOPWORDS
from collections import Counter

def getTextFromTweet(data):
  rawTweets = []
  for tweet in data:
    rawTweets.append(tweet["text"])
  return rawTweets

def findWords(cleanTweets):
  words = cleanTweets.split(" ")
  words = [w for w in words if len(w) > 2]
  words = [w.lower() for w in words]
  words = [w for w in words if w not in STOPWORDS]
  return words

def findMostCommonWords(lst):
    data = Counter(lst)
    return data.most_common(3)