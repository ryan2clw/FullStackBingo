""" Generates SQL tables for Cards and Rows """
from django.db import models

class Card(models.Model):
    """ A bingo card with 5 rows. """
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Card: " + str(self.id) + ", " + str(self.created_on)

class Row(models.Model):
    """ Each property is a column on a bingo card, should have 5 rows per card """
    b_val = models.CharField(max_length=3)
    i_val = models.CharField(max_length=3)
    n_val = models.CharField(max_length=3)
    g_val = models.CharField(max_length=3)
    o_val = models.CharField(max_length=3)
    card = models.ForeignKey(
        'Card',
        on_delete=models.CASCADE,
        related_name='rows')

    def __str__(self):
        return self.b_val + " " + self.i_val + " " + self.n_val + "\
            " + self.g_val + " " + self.o_val

class Ball(models.Model):
    """
    The ball in a ball-blower. Represents a random number 1-75.
    """
    num_value = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    is_played = models.BooleanField(default=False)

    def __str__(self):
        return str(self.num_value)

class MatchSmiley(models.Model):
    """ Derived from card data, each column is a number on a specific card"""
    one_value = models.CharField(max_length=3)
    two_value = models.CharField(max_length=3)
    three_value = models.CharField(max_length=3)
    four_value = models.CharField(max_length=3)
    five_value = models.CharField(max_length=3)
    six_value = models.CharField(max_length=3)
    seven_value = models.CharField(max_length=3)
    eight_value = models.CharField(max_length=3)
    nine_value = models.CharField(max_length=3)
    ten_value = models.CharField(max_length=3)
    eleven_value = models.CharField(max_length=3)
    twelve_value = models.CharField(max_length=3)
    thirteen_value = models.CharField(max_length=3)
    fourteen_value = models.CharField(max_length=3)
    needed_to_win = models.IntegerField()
    left = models.IntegerField()
