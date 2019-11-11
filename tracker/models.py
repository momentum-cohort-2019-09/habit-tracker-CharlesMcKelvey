from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# User
# - Username (Built-in)
# - Password (Built-in)
# - Email (Built-in)
# - FK to Habit
# - FK to Comment


class User(AbstractUser):

    def __str__(self):
        return self.username

# Habit
# - Name of Habit
# - Name of Goal/Target
# - Name of User with Habit
# - Date
# - Observers (M2M relationship to User)


class Habit(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    goal = models.IntegerField(blank=False, null=False)
    tracker = models.ForeignKey(
        to=User, related_name='habits', on_delete=models.CASCADE)  # If you delete the habit, it deletes all associated records
    created_at = models.DateField(default=timezone.now)
    updated_at = models.DateField(default=timezone.now)
    # Three weeks ahead as a default
    end = timezone.now() + timezone.timedelta(days=21)
    end_date = models.DateField(default=end)
    freq = models.CharField(max_length=10, default='daily')
    # This is for how the user wants to change their habit;
    # Make it more '>', maintain the habit '=' or reduce the habit '<'
    adjustment = models.CharField(max_length=10, default='=')
    # This will be a fun one. I think we can just, when someone wants to add a user to this, they can via email/username.
    observers = models.ManyToManyField(
        to=User, related_name='observers', blank=True)

    def __str__(self):
        return self.name

    def get_ratio(self):
        # Returns the ratio of all of the records amounts for a given habit. Showing progress and shaders appropriately
        pass


# Habit Record
# - Record of the habit (just good ol' metrics)
# - Name of the habit it is tied to
# - Date of the habit that given day
# - FK to Comments


class Record(models.Model):
    habit = models.ForeignKey(
        to=Habit, related_name='records', on_delete=models.SET_NULL, null=True)
    amount = models.PositiveIntegerField(blank=False, null=True)
    created_at = models.DateField(default=timezone.now)
    description = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.description

# Comment
# - Date of creation
# - Body of the comment
# - User making comment


class Comment(models.Model):
    commenter = models.ForeignKey(
        to=User, related_name='comment', null=True, on_delete=models.SET_NULL)
    habit = models.ForeignKey(
        to=Habit, related_name='comment', on_delete=models.SET_NULL, null=True)

    body = models.TextField(max_length=255, blank=False, null=True)
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.body
