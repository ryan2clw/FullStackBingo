# Generated by Django 2.2.4 on 2019-08-25 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0004_auto_20190825_0255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ball',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
