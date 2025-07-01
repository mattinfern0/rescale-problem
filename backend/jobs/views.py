from http import HTTPStatus

from django.db.models import Prefetch
from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .constants import JobStatusType
from .models import Job, JobStatus
from .serializers import JobDetailSerializer, CreateJobSerializer, PatchJobSerializer
from . import services


def job_to_job_detail(job: Job) -> JobDetailSerializer:
    current_status = job.statuses.order_by('-timestamp').first()
    return JobDetailSerializer({
        "id": job.id,
        "name": job.name,
        "created_at": job.created_at,
        "updated_at": job.updated_at,
        "current_status": current_status.status_type if current_status else JobStatusType.PENDING
    })


# Create your views here.
class JobDetailAPIView(APIView):
    def patch(self, request, **kwargs):
        serializer = PatchJobSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        job_id = kwargs.get("job_id")

        try:
            updated_job = services.update_job(job_id, serializer.validated_data)
            serialized_data = job_to_job_detail(updated_job).data
            return Response(serialized_data)
        except Job.DoesNotExist:
            return Response({"detail": "Job not found."}, status=HTTPStatus.NOT_FOUND)

    def delete(self, request, **kwargs):
        job_id = kwargs.get('job_id')
        try:
            services.delete_job(job_id)
            return Response(status=HTTPStatus.NO_CONTENT)
        except Job.DoesNotExist:
            return Response({"detail": "Job not found."}, status=HTTPStatus.NOT_FOUND)


class JobListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class JobListAPIView(GenericAPIView):
    pagination_class = JobListPagination

    def get_queryset(self):
        # Prefetch all job statuses to avoid N+1 query issues
        return Job.objects.prefetch_related(
            Prefetch('statuses', queryset=JobStatus.objects.order_by('-timestamp'))
        ).order_by('-created_at')

    def get(self, request, **kwargs):
        base_qs = self.get_queryset()
        jobs = self.paginate_queryset(base_qs)

        raw_job_data = []
        for job in jobs:
            raw_job_data.append({
                "id": job.id,
                "name": job.name,
                "created_at": job.created_at,
                "updated_at": job.updated_at,
                "current_status": job.statuses.first().status_type if job.statuses.exists() else JobStatusType.PENDING
            })

        serialized_data = JobDetailSerializer(raw_job_data, many=True).data
        return Response({
            "count": Job.objects.count(),
            "results": serialized_data
        })

    def post(self, request, **kwargs):
        serializer = CreateJobSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_job = services.create_new_job(serializer.validated_data)
        serialized_data = job_to_job_detail(new_job).data

        return Response(serialized_data, status=HTTPStatus.CREATED)
