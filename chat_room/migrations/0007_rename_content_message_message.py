# Generated by Django 3.2.3 on 2021-07-17 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_room', '0006_auto_20210717_1524'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='content',
            new_name='message',
        ),
    ]
