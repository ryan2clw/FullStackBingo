""" These are endpoints that get or create cards and rows """
from rest_framework import generics
from play.models import Card, Ball
from play.serializers import CardSerializer, BallSerializer

class CardList(generics.ListCreateAPIView):
    """ Get or create cards """
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class BallList(generics.ListAPIView):
    """ Get or Create Balls """
    queryset = Ball.objects.filter(is_played=True).order_by('updated_at')
    serializer_class = BallSerializer