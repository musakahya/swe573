from django.test import TestCase
from social_pill.functions.helper.helper import findWords, findMostCommonWords, getTextFromTweet

class findWordsTestCase(TestCase):

    def test_find_words(self):
        sentence = "Hey there! Are you able to find my words?"
        words = ['hey', 'there!', 'able', 'find', 'words?']
        self.assertEqual(findWords(sentence), words)

class findMostCommonWordsTestCase(TestCase):

    def test_find_most_common_words(self):
        words = ['hey', 'there!', 'able', 'find', 'words?', 'hey', 'hey', 'find', 'able', 'hey', 'find']
        mostCommonWords = [('hey', 4), ('find', 3), ('able', 2)]
        self.assertEqual(findMostCommonWords(words), mostCommonWords)

class getTextFromTweetTestCase(TestCase):

    def test_get_text_from_tweet_test_case(self):
        data = [{'text': 'this is the one', 'not_text': 'this is not the one'}]
        rawTweet = 'this is the one'
        self.assertEqual(getTextFromTweet(data)[0], rawTweet)