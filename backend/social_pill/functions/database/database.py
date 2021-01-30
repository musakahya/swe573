from social_pill.models import Tweet, History
from social_pill.serializers import TweetSerializer

def retrieveTweetsFromDatabase(keyword):
  response = Tweet.objects.filter(search_term=keyword)
  tweets = TweetSerializer(response, many=True)
  arr = [tweets.data, response.aggregate(Max('tweet_id'))]
  return arr

def saveNewTweetsIntoDatabase(data, user, search_term):
  tweetObjects = []
  for tweets in data:
    if(Tweet.objects.filter(tweet_id=tweets["id"]).count() == 0):
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

def saveHistory(request):
  History.objects.create(
            email_address=request.GET.get('q', None).split('/?u=')[1],
            search_term=request.GET.get('q', None).split('/?u=')[0],
            date=date.today(),
  )