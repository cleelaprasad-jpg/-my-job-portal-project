from rest_framework import serializers
from .models import Job,JobApplication
#create your serializers here

#job serializer
class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source = 'company.name',
        read_only = True
    )
    class Meta:
        model = Job
        fields =[
            'id',
            'company',
            'company_name',
            'title',
            'description',
            'location',
            'salary',
            'job_type',
            'experience_required',
            'created_at',
            'is_active',
        ]
        read_only_fields = [
            'id',
            'created_at',
            'is_active'
        ]

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