from django.contrib import admin

# Register your models here.
from .models import Job, JobStatus

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')

@admin.register(JobStatus)
class JobStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'status_type', 'timestamp')
    search_fields = ('job__name', 'status_type')
    list_filter = ('status_type', 'timestamp')
