from rest_framework import serializers

from .constants import JobStatusType


class JobDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(min_length=1, max_length=255)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    current_status = serializers.ChoiceField(choices=JobStatusType.choices)


class CreateJobSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)


class PatchJobSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=1, max_length=255, required=False)
    status = serializers.ChoiceField(choices=JobStatusType.choices, required=False)
