from django.shortcuts import get_object_or_404
from .serializers import JobApplicationSerializer,ApplicationStatusSerilizer
from rest_framework import generics

from .models import Job,JobApplication
from apps.jobs.permissions import IsRecruiter
from .permissions import IsJobSeeker
from rest_framework.exceptions import ValidationError
# Create your views here.

# Create your views here.
   
#job apply view -job seekers only
class JobApplyView(generics.CreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsJobSeeker]

    def perform_create(self, serializer):
        job = get_object_or_404(                #finds the job using id in the url return 404 if not exists
            Job,                            
            pk=self.kwargs["pk"],
            is_active=True
        )

        if JobApplication.objects.filter(           #check whether the logged in user has already applied if yes raise 400 error
            job=job,
            applicant=self.request.user
        ).exists():
            raise ValidationError(
                "You have already applied for this Job."
            )
        serializer.save(                            #automatically sets job from the url and applicant as the logged in user
            job=job,                                #the frontend does not send either value.
            applicant=self.request.user 
        )

#job Applications list view - recruiters only
class JobApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsRecruiter]

    def get_queryset(self):
        job = get_object_or_404(
            Job,                            #allows recruiter to view applicants only for their posted jobs only
            pk=self.kwargs["pk"],
            created_by=self.request.user
        )
        return JobApplication.objects.filter(job=job)


#Applied jobs view-jobseekers (logged in only) 
class MyApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer              #This view returns only the Logged in job seeker's applications.
    permission_classes = [IsJobSeeker]

    def get_queryset(self):
        return JobApplication.objects.filter(
            applicant=self.request.user
        )
    
#Application status update - recruiters only
class UpdateStatusView(generics.UpdateAPIView):
    serializer_class = ApplicationStatusSerilizer
    

    def get_queryset(self):
        return JobApplication.objects.filter(
            job__created_by=self.request.user           #This ensures the recruiter can update only applications for jobs they own
        )
    
    """
    This gets the application only from filtered queryset if the recruiter doesn't own that job then return 
    404 which is exactly the behaviour you want.
    """

    def get_object(self):
        return self.get_queryset().get(pk=self.kwargs["pk"])