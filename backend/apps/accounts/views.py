from django.shortcuts import render
from rest_framework import generics,status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import JobSeekerSerializer
from .serializers import RecruiterSerializer
from .serializers import CompanySerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from apps.jobs.permissions import IsRecruiter
from rest_framework.permissions import IsAuthenticated

#jobseeker sign up view 
class JobSeekerSignupView(generics.CreateAPIView):
    serializer_class = JobSeekerSerializer
    
    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)

        return Response({
            'message':'Account created successfully',
            'access':str(refresh.access_token),
            'refresh':str(refresh),
            'role':user.role
        },
        status=status.HTTP_201_CREATED
        )


#recruiter sign up view
class RecruiterSignupView(generics.CreateAPIView):
    serializer_class = RecruiterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "message":"Account created successfully",
            "refresh":str(refresh),
            "access":str(refresh.access_token),
            "role":user.role
        },
        status=status.HTTP_201_CREATED
        )

#login view 
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


#company profile sview
class CompanyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsRecruiter,IsAuthenticated]

    def get_object(self):                       #always returns the logged in recruiter's company details
        return self.request.user.recruiter_profile.company
    
