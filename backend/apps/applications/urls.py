from django.urls import path
from .views import UpdateStatusView,JobApplyView,JobApplicationsView,MyApplicationsView
urlpatterns = [
    path('job/<int:pk>/apply/',JobApplyView.as_view(),name='job-apply'),
    path('job/<int:pk>/applications/',JobApplicationsView.as_view(),name='list-applicants'), #jobs applications viewed by recruiter
    path('job/my-applications/',MyApplicationsView.as_view(),name='my-appliations'),#jobseeker applications list
    path('applications/<int:pk>/status/',UpdateStatusView.as_view(),name='application-status'), #to get status updated by recruiter based on id column

]