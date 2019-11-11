from django.contrib import admin
from tracker.models import User, Habit, Record, Comment
# Register your models here.


admin.site.register(User)
admin.site.register(Record)
admin.site.register(Habit)
admin.site.register(Comment)
