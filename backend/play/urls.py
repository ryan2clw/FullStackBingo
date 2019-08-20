""" urls for playing bingo """
from django.urls import path
from play.views import CardList
urlpatterns = [
    path('cards/', CardList.as_view(), name='cards')
]