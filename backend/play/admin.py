""" Ties the play models to the admin site """
from django.contrib import admin
from play.models import Card, Row, Ball

admin.site.register(Card)
admin.site.register(Row)
admin.site.register(Ball)