# Website-backend

## Docker Deployment
1. Execute `docker build --tag marketplace-backend . --no-cache` from the repository root directory (current).
2. Run `docker image ls`, you should see the *marketplace-backend* listed, it will confirm the image has been built.
3. Run `docker run -it -p 8000:8000 marketplace-backend`, the application should start.

NB! `-it` is required for interactive shell execution, otherwise `CTRL+C` won't just reach the backend in Docker, so it won't be possible close it gracefully.

NB! `-p 8000:8000` is required to expose API ports outside the container, so the requests to container will reach the API service and back
