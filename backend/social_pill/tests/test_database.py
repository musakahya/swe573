from django.test import TestCase
from social_pill.functions.database.database import queryDatabaseByDateForTest

class queryDatabaseTestCase(TestCase):

    def test_query_database(self):
        res = queryDatabaseByDateForTest()
        print(res[0])
        self.assertEqual(len(res), 1)