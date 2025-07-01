build:
	docker compose build
up:
	docker compose run --rm backend python manage.py migrate
	docker compose up backend frontend -d
stop:
	docker compose stop
clean:
	docker compose down -v --remove-orphans
test:
	docker compose build
	docker compose run --rm backend python manage.py migrate
	docker compose run --rm backend python manage.py reset_db
	docker compose up backend test-frontend -d
	docker compose run playwright
	docker compose stop