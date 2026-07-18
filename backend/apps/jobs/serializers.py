from rest_framework import serializers
from .models import Job
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