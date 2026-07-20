from django.db import models
from apps.accounts.models import Company,User
from django.conf import settings

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

#job applications model
class JobApplication(models.Model):
    STATUS_CHOICE = (
        ("pending","Pending"),
        ("reviewed","Reviewed"),
        ("accepted","Accepted"),
        ("rejected","Rejected")
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICE,
        default="pending"
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-applied_at"]

        constraints = [
            models.UniqueConstraint(
                fields=["job","applicant"],
                name="unique_job_application"
            )
        ]
    def __str__(self):
        return f"{self.applicant.email} -> {self.job.title}"