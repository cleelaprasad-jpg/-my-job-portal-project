from django.urls import path
from .views import JobSeekerSignupView,RecruiterSignupView,CustomTokenObtainPairView

urlpatterns = [
    path('jobseeker/signup/',JobSeekerSignupView.as_view(),name='jobseeker-signup'),
    path('recruiter/signup/',RecruiterSignupView.as_view(),name='recruiter-signup'),
    path('login/',CustomTokenObtainPairView.as_view(),name='login'),
]