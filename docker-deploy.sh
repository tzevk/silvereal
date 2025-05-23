#!/bin/bash

# Script to deploy the Silvereal application using Docker

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
else
  echo "Error: .env.local file not found. Please create it with your NEON_DATABASE_URL."
  exit 1
fi

# Check if NEON_DATABASE_URL is set
if [ -z "$NEON_DATABASE_URL" ]; then
  echo "Error: NEON_DATABASE_URL is not set in .env.local"
  exit 1
fi

# Build and start the Docker containers
echo "Building and starting Docker containers..."
docker-compose up --build -d

echo "Deployment completed successfully!"
echo "Your application is now running at http://localhost:3000"
