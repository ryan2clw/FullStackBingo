""" urls for playing bingo """
from django.urls import path
from play.views import CardList, BallList, reset_balls, blow_balls

urlpatterns = [
    path('blow-balls/', blow_balls, name='blow-balls'),
    path('reset-balls/', reset_balls, name='reset-balls'),
    path('balls/', BallList.as_view(), name='balls'),
    path('cards/', CardList.as_view(), name='cards')
]