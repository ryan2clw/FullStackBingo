""" urls for playing bingo """
from django.urls import path
from play.views import CardList, BallList
urlpatterns = [
    path('balls/', BallList.as_view(), name='balls'),
    path('cards/', CardList.as_view(), name='cards')
]