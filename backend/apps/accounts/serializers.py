from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import JobSeekerProfile
from .models import RecruiterProfile 
from .models import Company
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User = get_user_model()

class JobSeekerSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField()
    skills = serializers.CharField(required=False)
    experience = serializers.IntegerField(required=False,default=0)
    resume = serializers.FileField(required=False)
    location = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password',
            'full_name',
            'skills',
            'experience',
            'resume',
            'location'
        ]
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def create(self,validated_data):
        full_name = validated_data.pop('full_name')
        skills=validated_data.pop('skills','')
        experience = validated_data.pop('experience',0)
        resume = validated_data.pop('resume',None)
        location = validated_data.pop('location','')


        user = User.objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            phone = validated_data['phone'],
            password = validated_data['password'],
            role = 'job_seeker'
        )
        JobSeekerProfile.objects.create(
            user = user,
            full_name = full_name,
            skills = skills,
            experience = experience,
            resume = resume,
            location = location,
        )
        return user

class RecruiterSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField()
    designation = serializers.CharField()
    company_logo = serializers.FileField(required=False)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password',
            'company_name',
            'designation',
            'company_logo'
        ]
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def create(self, validated_data):
        company_name = validated_data.pop('company_name')
        designation = validated_data.pop('designation')
        company_logo = validated_data.pop('company_logo',None)

        user = User.objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            phone = validated_data['phone'],
            password = validated_data['password'] ,
            role = 'recruiter'
        )

        company,created = Company.objects.get_or_create(
            name = company_name,
            defaults={
                'logo':company_logo
            }

        )

        RecruiterProfile.objects.create(
            user = user,
            company = company,
            designation = designation,
            
        )

        return user

#custom token serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)

        token['role'] = user.role
        token['username'] = user.username
        token['email'] = user.email
        return token
    def validate(self, attrs):
        data =  super().validate(attrs)

        data['role'] = self.user.role  #later need to add username and email as well if you like
        return data
#company serializer 
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            "id",
            "name",
            "website",
            "description",
            "logo"
        ]
        read_only_fields = ["id"]