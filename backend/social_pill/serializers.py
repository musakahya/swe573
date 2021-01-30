from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import History, Tweet
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email')

class TweetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = ('id', 'user', 'search_term', 'date', 'tweet_text', 'tweet_entities', 'tweet_id', 'tweet_date', 'tweet_json')

class UserSerializerWithToken(serializers.ModelSerializer):

    try:
        token = serializers.SerializerMethodField()
        password = serializers.CharField(write_only=True)

        def get_token(self, obj):
            jwtPayloadHandler = api_settings.JWT_PAYLOAD_HANDLER
            jwtEncodeHandler = api_settings.JWT_ENCODE_HANDLER

            payload = jwtPayloadHandler(obj)
            token = jwtEncodeHandler(payload)
            return token

        def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance

        class Meta:
            model = User
            fields = ('token', 'username', 'password', 'email')

    except Exception as e:
        #return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print(str(e))
        
class HistorySerializer(serializers.ModelSerializer):
  class Meta:
    model = History
    fields = ('id', 'email_address', 'search_term', 'date')