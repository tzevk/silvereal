# Silvereal Docker Deployment Guide

This guide explains how to deploy the Silvereal application using Docker, which provides a consistent and isolated environment for running the application.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- A Neon database connection string

## Setup

1. **Environment Variables**

   Make sure you have a `.env.local` file in the root of your project with your Neon database connection string:

   ```
   NEON_DATABASE_URL=postgresql://your_username:your_password@your_neon_host/your_database?sslmode=require
   ```

2. **Build and Run with Docker**

   You can use one of the provided scripts to deploy the application:

   - On Windows:
     ```
     .\docker-deploy.bat
     ```

   - On macOS/Linux:
     ```
     chmod +x ./docker-deploy.sh
     ./docker-deploy.sh
     ```

   Alternatively, you can run the Docker commands manually:

   ```bash
   # Build and start the containers
   docker-compose up --build -d
   ```

3. **Access the Application**

   Once the containers are running, you can access the application at:
   
   [http://localhost:3000](http://localhost:3000)

## Docker Commands

Here are some useful Docker commands for managing your application:

- **View logs**:
  ```bash
  docker-compose logs -f
  ```

- **Stop the application**:
  ```bash
  docker-compose down
  ```

- **Restart the application**:
  ```bash
  docker-compose restart
  ```

- **Rebuild and restart (after code changes)**:
  ```bash
  docker-compose up --build -d
  ```

## Production Deployment

For production deployment, consider the following:

1. **Use a production-ready Docker Compose file**:
   - Remove any development-specific settings
   - Add proper resource limits
   - Configure proper networking

2. **Set up a reverse proxy** (like Nginx or Traefik) to handle HTTPS and routing

3. **Use Docker secrets or a secure environment variable management system** instead of `.env` files

4. **Set up monitoring and logging** for your containers

## Troubleshooting

- **Application can't connect to the database**:
  - Verify your Neon database connection string is correct
  - Check if your Neon database allows connections from your Docker container's IP

- **Container exits immediately**:
  - Check the logs with `docker-compose logs`
  - Ensure all required environment variables are set

- **Changes to code aren't reflected**:
  - Rebuild the Docker image with `docker-compose up --build -d`
