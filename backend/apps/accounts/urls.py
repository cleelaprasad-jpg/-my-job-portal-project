from django.urls import path
from .views import JobSeekerSignupView,RecruiterSignupView,CustomTokenObtainPairView,CompanyProfileView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('jobseeker/signup/',JobSeekerSignupView.as_view(),name='jobseeker-signup'),
    path('recruiter/signup/',RecruiterSignupView.as_view(),name='recruiter-signup'),
    path('login/',CustomTokenObtainPairView.as_view(),name='login'),
    path('refresh/',TokenRefreshView.as_view(),name='token-refresh'),
    path('company/profile/',CompanyProfileView.as_view(),name='company-profile'), #GET and PATCH only allowed

]