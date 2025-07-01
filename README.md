# Job Management Dashboard

## Local Development
### Prerequisites
- Docker
- Docker Compose
- Bash
- make

### Setup
1. Run `make build` to build the Docker images.
2. Run `make up` to start the application. Migrations will be run automatically.

## Testing

### E2E Tests
1. Run `make test`

# Performance Considerations
- I implemented server-side pagination to avoid sending all jobs to the client. Client-side pagination doesn't work
assuming there are over 1 million jobs in the database.
- For the jobs list endpoint, I prefetched all relevant job statuses to avoid N+1 queries when calculating the latest
status for each job

# Other Notes
- Time Taken: ~5 hours
  - Some time was for learning Playwright and how to integrate it with Docker.
- If I had more time, I'd implement a production stage in the backend Dockerfile that only installs production dependencies.
- Since the app is all client-side, I wouldn't use Docker to deploy the frontend. Instead, I would compile the frontend and serve the static files.

