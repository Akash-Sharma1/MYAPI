from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="Index"),
    path('save',views.Save_user,name="Save"),
]
