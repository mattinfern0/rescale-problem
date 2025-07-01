from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from jobs.models import Job, JobStatus


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        JobStatus.objects.all().delete()
        Job.objects.all().delete()