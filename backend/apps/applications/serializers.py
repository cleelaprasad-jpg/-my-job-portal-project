from rest_framework import serializers
from .models import JobApplication
#create your serializer here

#job application serializer
class JobApplicationSerializer(serializers.ModelSerializer):
    applicant_email = serializers.EmailField(
        source ="applicant.email",
        read_only=True
    )

    job_title = serializers.CharField(
        source = "job.title",
        read_only=True
    )
    #adding name and resume also to the serializer to be displayed in the frontend
    applicant_name = serializers.CharField(
        source = "applicant.job_seeker_profile.full_name",
        read_only=True
    )

    resume = serializers.FileField(
        source = "applicant.job_seeker_profile.resume",
        read_only=True
    )
    class Meta:
        model = JobApplication
        fields = [
            "id",
            "job",
            "job_title",
            "applicant",
            "applicant_name",
            "applicant_email",
            "resume",
            "status",
            "applied_at",
        ]
        read_only_fields = [
            "id",
            "applicant",
            "job",
            "status",
            "applied_at",
        ]

#recruiter updates status serializer
#we use a seperate serializer because this only updates a single  status field only
class ApplicationStatusSerilizer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['status']