""" These are endpoints that get or create cards and rows """
from os import system
from random import randint
from django.http import JsonResponse
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework import generics
from background_task import background
from background_task.models_completed import CompletedTask
from background_task.models import Task
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

def reset_balls_private():
    """ Clear balls status and delete old tasks """
    Ball.objects.all().update(
        is_played=False,
        updated_at=timezone.now()
    )
    CompletedTask.objects.all().delete()
    Task.objects.all().delete()

@api_view(['GET'])
def reset_balls(request):
    """ Clear balls status and delete old tasks """
    reset_balls_private()
    return JsonResponse({'ok':'balls cleared and tasks reset'}, status=200)

@api_view(['GET'])
def blow_balls(request):
    reset_balls_private()
    for i in range(75):
        wait_time = i * 5
        blow_balls_private(schedule=wait_time)
    shell_cmd = 'cd /Users/ryandines/Bingo/\
        && pipenv run backend/manage.py process_tasks &'
    system(shell_cmd)
    return JsonResponse({'ok':'ball blower started'}, status=200)  

@background()
def blow_balls_private():
    """ moves ball from unplayed status to played """
    balls = Ball.objects.filter(is_played=False)
    max_index = len(balls)-1
    if max_index >= 0:
        my_index = randint(0, max_index)
        ball = balls[my_index]
        ball.is_played = True
        ball.save()
        print("Ball Blown: ", str(ball.num_value))
    return JsonResponse({'ok':'game ended'}, status=200)