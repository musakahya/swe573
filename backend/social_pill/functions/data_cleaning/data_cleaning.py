import re

def removeUrl(txt):
    
    urlPattern = re.compile(r'https?://\S+|www\.\S+')
    noUrl = urlPattern.sub(r'', txt)

    return noUrl

def cleanTweets(rawTweets):
  rawString = ''.join(rawTweets)
  noLinks = re.sub(r'http\S+', '', rawString)
  noUnicode = re.sub(r"\\[a-z][a-z]?[0-9]+", '', noLinks)
  noSpecialCharacters = re.sub('[^A-Za-z ]+', '', noUnicode)
  return noSpecialCharacters