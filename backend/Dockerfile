FROM python:3.11-slim-bookworm as development

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000
RUN useradd app_user

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=app_user:app_user ./ ./

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
