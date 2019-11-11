"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.conf import settings
from django.urls import path, include
from tracker import views
from rest_framework import routers


urlpatterns = [
    # Main Pages
    path('', views.home, name='home'),
    path('profile/<int:pk>/', views.profile, name='profile'),
    path('habit/<int:pk>/', views.habit, name='habit'),
    # Habit Related
    path('add_habit/', views.add_habit, name="add_habit"),
    path('edit_habit/<int:pk>/', views.edit_habit, name="edit_habit"),
    path('delete_habit/<int:pk>/', views.delete_habit, name='delete_habit'),
    # Record Related
    path('add_record/<int:pk>/', views.add_record, name='add_record'),
    path('edit_record/<int:pk>/', views.edit_record, name='edit_record'),
    path('delete_record/<int:pk>/', views.delete_record, name="delete_record"),
    # Otherwise
    path('admin/', admin.site.urls),
    url(r'^accounts/', include('registration.backends.default.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

    ] + urlpatterns
