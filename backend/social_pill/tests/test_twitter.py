from django.test import TestCase
from social_pill.functions.twitter.twitter import queryTwitter, queryTwitterForTest

class queryTwitter(TestCase):

    def test_query_twitter(self):
        res = queryTwitterForTest()
        newTweets = []
        for tweet in res:
            newTweets.append(tweet._json)
        self.assertEqual(len(newTweets), 1)