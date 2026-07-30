
from .serializers import JobSerializer
from rest_framework import generics

from .models import Job
from .permissions import IsRecruiter
from rest_framework.permissions import IsAuthenticated
# Create your views here.

#create job view
class JObView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def perform_create(self, serializer):
        serializer.save(
            company=self.request.user.recruiter_profile.company,
            created_by=self.request.user
            )
        
#list jobs view
class JobListView(generics.ListAPIView):
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request 
        return context 
    
#Detail job view
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request 
        return context 

#Update jobs view   (supports put and patch)
class JobUpdateview(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request,obj)
        return obj

#delete jobs view 
class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request,obj)
        return obj

 #all jobs posted by logged in recruiter
class RecruiterJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter,IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(created_by=self.request.user).order_by('-created_at')



    
