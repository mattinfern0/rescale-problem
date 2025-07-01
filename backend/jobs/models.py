from django.db import models

from .constants import JobStatusType


# Create your models here.

class Job(models.Model):
    id = models.BigAutoField(primary_key=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=255)

    def __str__(self):
        return f"Job(id={self.id}, name={self.name})"


class JobStatus(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['job', 'timestamp'], name='unique_job_status_per_timestamp')
        ]

    id = models.BigAutoField(primary_key=True)

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='statuses')
    status_type = models.CharField(max_length=20, choices=JobStatusType.choices)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"JobStatus(id={self.id}, job={self.job.id}, status_type={self.status_type}, timestamp={self.timestamp})"


