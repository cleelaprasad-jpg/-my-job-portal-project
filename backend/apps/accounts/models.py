from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# phone_validator = RegexValidator(
#     regex='^[6-9]\d{9}$',
#     message='enter a valid 10 digit mobile number'
# temporary

#user model
class User(AbstractUser): #password and username will be created automatically by django AbstractUser Class
    ROLE_CHOICES = (
        ('job_seeker','Job Seeker'),
        ('recruiter','Recruiter')
    )

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10,unique=True)
    role = models.CharField(max_length=20,choices=ROLE_CHOICES)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__ (self):
        return self.email

#job seeker model which uses user model in the above
class JobSeekerProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='job_seeker_profile'
    )

    full_name = models.CharField(max_length=100)

    date_of_birth = models.DateField(null=True,blank=True)

    skills = models.TextField(blank=True)

    experience = models.PositiveIntegerField(default=0)

    resume = models.FileField(
        upload_to='resume/',
        null=True,
        blank=True
    )

    location = models.CharField(max_length=200,blank=True)

    def __str__ (self):
        return self.full_name

#company model
class Company(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    logo = models.FileField(
        upload_to='company_logo/',
        null=True,
        blank=True,
    )
    def __str__(self):
        return self.name


#recruiter model which uses user model in the above
class RecruiterProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='recruiter_profile'
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='recruiters'
    )

    designation = models.CharField(max_length=200)

    def __str__(self):
        return self.company.name