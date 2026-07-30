from rest_framework import serializers
from .models import Job
from apps.applications.models import JobApplication
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
            'has_applied',
        ]
        read_only_fields = [
            'id',
            'created_at',
            'company',
            'is_active'
        ]

        def get_has_applied(self,obj):
            request = self.context.get("request")
            #checks if logged in jobseeker already applied the job or not (True or False) will be returned
            if not request or not request.user.is_Authenticated:
                return False 
            return JobApplication.object.filter(applicant=request.user,job=obj).exits()