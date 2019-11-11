from tracker.models import User, Comment, Habit, Record
from django import forms


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
        ]


class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit

        fields = [
            'name',
            'goal',
            'description',
            'end_date',
            'freq',
            'adjustment'
        ]


class RecordForm(forms.ModelForm):
    class Meta:
        model = Record
        fields = [
            'amount',
            'description'
        ]


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = [
            'body',
            'commenter'
        ]
