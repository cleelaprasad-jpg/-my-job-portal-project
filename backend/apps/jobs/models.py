from django.db import models
from apps.accounts.models import Company,User


# Create your models here.
#job table model
class Job(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posted_jobs'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100)

    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    JOB_TYPE_CHOICES = (
        ('full_time','Full Time'),
        ('part_time','Part Time'),
        ('contract','Contract')
    )

    job_type = models.CharField(max_length=20,choices=JOB_TYPE_CHOICES)
    experience_required = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

