# Generated by Django 3.2.3 on 2021-07-15 12:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_comment_comment_like'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-posted_at']},
        ),
    ]