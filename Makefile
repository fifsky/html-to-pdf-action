.PHONY: build
build:
	docker build -f docker/Dockerfile -t fifsky/html-to-pdf:latest .