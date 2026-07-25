from django.urls import path
from .views import JObView,JobListView,JobDetailView,JobUpdateview,JobDeleteView, RecruiterJobListView

urlpatterns = [
    path('postjob/',JObView.as_view()),
    path('joblist/',JobListView.as_view(),name='job-list'),
    path('myjobs/',RecruiterJobListView.as_view(),name='recruiter-job-list'),
    path('job/<int:pk>/',JobDetailView.as_view(),name='job-detail'),
    path('job/<int:pk>/update/',JobUpdateview.as_view(),name='job-update'),
    path('job/<int:pk>/delete/',JobDeleteView.as_view(),name='job-delete'),
   

]