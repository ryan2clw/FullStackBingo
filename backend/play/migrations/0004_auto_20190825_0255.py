# Generated by Django 2.2.4 on 2019-08-25 02:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0003_auto_20190825_0202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ball',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
