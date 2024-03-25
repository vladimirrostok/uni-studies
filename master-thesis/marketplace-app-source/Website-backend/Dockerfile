# Start from golang base image.
# FROM docker.io/library/golang:1.17.5-alpine3.15@sha256:4918412049183afe42f1ecaf8f5c2a88917c2eab153ce5ecf4bf2d55c1507b74 as builder
FROM golang:1.17-alpine3.15 as builder

# Add Maintainer info.
LABEL maintainer="The Banished"

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git

# Set the current working directory inside the container.
WORKDIR /app

# Copy go mod and sum files.
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and the go.sum files are not changed.
RUN go mod download

# Copy the source from the current directory to the working Directory inside the container.
COPY . .

# Build the Go app.
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/main.go

# Start a new stage from scratch.
FROM alpine:3.15.0
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Create directory to place the configuration file.
RUN mkdir -p /app/cmd/config

# Copy the Pre-built binary file from the previous stage and certificates and the configuration file.
COPY --from=builder /app/main .
COPY --from=builder /app/cmd/config/configuration.env /app/cmd/config

EXPOSE 8000

# Command to run the executable
CMD ["./main"]