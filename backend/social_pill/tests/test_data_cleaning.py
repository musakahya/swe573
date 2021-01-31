from django.test import TestCase
from social_pill.functions.data_cleaning.data_cleaning import removeUrl, cleanTweets

class removeUrlTestCase(TestCase):

    def test_remove_url(self):
        sentence = "can you remove https://www.google.com"
        withoutUrl = "can you remove "
        self.assertEqual(removeUrl(sentence), withoutUrl)

class cleanTweetsTestCase(TestCase):

    def test_clean_tweets(self):
        sentence = "can you clean me % 123. >#]}1237 !? https://www.google.com"
        cleaned = "can you clean me     "
        self.assertEqual(cleanTweets(sentence), cleaned)