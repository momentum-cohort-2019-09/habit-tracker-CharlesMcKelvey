# Generated by Django 2.2.7 on 2019-11-06 18:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0003_auto_20191106_1819'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comments',
            new_name='commenter',
        ),
    ]