from django.urls import path

from . import views

urlpatterns = [
    path("", views.JobListAPIView.as_view()),
    path("<int:job_id>/", views.JobDetailAPIView.as_view()),
]