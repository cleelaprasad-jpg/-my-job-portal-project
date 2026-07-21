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

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "job",
            "job_title",
            "applicant",
            "applicant_email",
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