# Generated by Django 2.2.4 on 2019-08-25 02:02

from django.db import migrations

def seed_database(apps, _):
    """ Seed the ball numbers into the database """
    balls = apps.get_model('play', 'Ball')
    balls.objects.all().delete()
    for i in range(1, 76):
        data = {
            "num_value" : i,
            "is_played" : False
        }
        ball = balls.objects.create(**data)
        ball.save()

class Migration(migrations.Migration):

    dependencies = [
        ('play', '0002_ball_matchsmiley'),
    ]

    operations = [
        migrations.RunPython(seed_database)
    ]
