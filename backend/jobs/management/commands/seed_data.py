from django.core.management.base import BaseCommand
from jobs.services import create_new_job


class Command(BaseCommand):
    def handle(self, *args, **options):
        for i in range(3):
            create_new_job({
                "name": f"Job {i + 1}"
            })