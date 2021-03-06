# Generated by Django 3.2.3 on 2021-07-17 13:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat_room', '0005_auto_20210717_1434'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='account', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='direct_message',
            field=models.ManyToManyField(blank=True, related_name='message', to='chat_room.Direct_message'),
        ),
    ]
