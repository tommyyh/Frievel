# Generated by Django 3.2.3 on 2021-07-08 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_account_profilepic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profilePic',
            field=models.FileField(blank=True, upload_to='media/profile'),
        ),
    ]
