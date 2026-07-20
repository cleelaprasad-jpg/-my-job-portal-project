from django.urls import path
from .views import JObView,JobListView,JobDetailView,JobUpdateview,JobDeleteView,JobApplyView,JobApplicationsView,MyApplicationsView
from .views import UpdateStatusView
urlpatterns = [
    path('postjob/',JObView.as_view()),
    path('joblist/',JobListView.as_view(),name='job-list'),
    path('job/<int:pk>/',JobDetailView.as_view(),name='job-detail'),
    path('job/<int:pk>/update/',JobUpdateview.as_view(),name='job-update'),
    path('job/<int:pk>/delete/',JobDeleteView.as_view(),name='job-delete'),
    path('job/<int:pk>/apply/',JobApplyView.as_view(),name='job-apply'),
    path('job/<int:pk>/applications/',JobApplicationsView.as_view(),name='list-applicants'), #jobs applications viewed by recruiter
    path('job/my-applications/',MyApplicationsView.as_view(),name='my-appliations'),#jobseeker applications list
    path('applications/<int:pk>/status/',UpdateStatusView.as_view(),name='application-status'), #to get status updated by recruiter based on id column


]