# Generated by Django 3.2.3 on 2021-07-16 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_room', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='direct_message',
            name='chat_id',
            field=models.TextField(blank=True),
        ),
    ]