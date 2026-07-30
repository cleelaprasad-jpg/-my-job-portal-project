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
    #serializermethodfield is a special field in django  rest thet does't exit in db but is calculated by a method every time the serializer return data
    has_applied = serializers.SerializerMethodField()
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
        if not request or not request.user.is_authenticated:
            return False 
        return JobApplication.objects.filter(applicant=request.user,job=obj).exists()