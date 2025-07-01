from django.db import transaction
from django.utils import timezone

from .models import Job, JobStatus, JobStatusType


@transaction.atomic
def create_new_job(data: dict) -> Job:
    job = Job(name=data["name"])
    job.save()

    initial_status = JobStatus(
        status_type=JobStatusType.PENDING,
        job=job,
        timestamp=timezone.now()
    )
    initial_status.save()

    return job


@transaction.atomic
def update_job(job_id: int, data: dict) -> Job:
    job = Job.objects.get(id=job_id)

    if "name" in data:
        job.name = data["name"]
        job.save()

    if "status" in data:
        new_status = data["status"]
        job_status = JobStatus(
            job=job,
            status_type=JobStatusType(new_status),
            timestamp=timezone.now()
        )
        job_status.save()

    return job


@transaction.atomic
def delete_job(job_id: int) -> None:
    job = Job.objects.get(id=job_id)

    JobStatus.objects.filter(job=job).delete()
    job.delete()

