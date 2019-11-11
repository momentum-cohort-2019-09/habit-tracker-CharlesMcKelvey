from django.shortcuts import render, get_object_or_404, redirect
from tracker.models import User, Habit, Record
from django.contrib.auth.decorators import login_required
from tracker.forms import HabitForm, RecordForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# ---------------- General Pages ----------------


def home(request):
    """
    This will show a general concept of what the app is for with a login/registration form on the top right, a logo in the top left, and a hero fold, with 2 other folds of habit examples
    """
    return render(request, 'home.html')


@login_required
def profile(request, pk):
    # Should
    habits = Habit.objects.filter(tracker=User.objects.get(pk=pk))
    day_sums = []
    for habit in habits:
        records = Record.objects.filter(habit=habit)
        if len(records) == 0:
            pass
        else:
            habit_object = {habit.name: {
                'labels': [], 'data': []}}
            for record in records:
                if record.created_at not in habit_object[habit.name]['labels']:
                    habit_object[habit.name]['labels'].append(
                        record.created_at)

            for date in habit_object[habit.name]['labels']:
                summed = 0
                # This feels redundant and it is late but I know this will work. Sure there is a more efficient way
                more_records = Record.objects.filter(
                    habit=habit).filter(created_at=date)
                for record in more_records:
                    summed += record.amount
                habit_object[habit.name]['data'].append(summed)
            day_sums.append(habit_object)
    # Aggregate data to display a graph appropriately
    habit_form = HabitForm(instance=request.user)
    return render(request, 'profile.html', {'habits': habits, 'habit_form': habit_form, 'day_sums': day_sums})


@login_required
def habit(request, pk):
    # Aggregate data to display a graph appropriately
    habit = get_object_or_404(Habit, pk=pk)
    records = Record.objects.filter(habit=habit)
    record_form = RecordForm(instance=request.user)
    return render(request, 'habit.html', {'habit': habit, 'records': records, 'record_form': record_form})

# ---------------- Habit Related ----------------
@login_required
@csrf_exempt
def add_habit(request):
    habit_form = HabitForm(data=request.POST)
    print('This is the request.POST \n', request.POST)

    if habit_form.is_valid():
        habit = habit_form.save(commit=False)
        habit.tracker = request.user
        habit.save()

        # If the Habit submitted is a valid form, then it is True and handle the appended information
        print('Nice, it worked!')
        return redirect('profile', pk=request.user.pk)
    else:
        # If the Habit submitted isn't valid, then return False and handle it in the JavaScript
        print('Not so nice!')
        return redirect('profile', pk=request.user.pk)


def edit_habit(request, pk):
    habit = get_object_or_404(Habit, pk=pk)

    # Pull up the habit, and with the request,
    if request.method == 'POST':
        # Overwrite the information
        habit = request.data
        # This may not be needed as I don't think I would ever load just one record


@csrf_exempt
def delete_habit(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    habit.delete()
    return JsonResponse({'ok': True})


def add_record(request, pk):
    record_form = RecordForm(data=request.POST)
    habit = Habit.objects.get(pk=pk)
    if record_form.is_valid():
        record = record_form.save(commit=False)
        record.commenter = request.user
        record.habit = habit
        record.save()

        return redirect('habit', pk=pk)
    else:
        return redirect('habit', pk=pk)


def delete_record(request, pk):
    record = get_object_or_404(Record, pk=pk)


def edit_record(request, pk):
    record = get_object_or_404(Record, pk=pk)
