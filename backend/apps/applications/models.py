from django.db import models
from apps.jobs.models import Job
from django.conf import settings
# Create your models here.
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