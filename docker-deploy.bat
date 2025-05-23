@echo off
REM Script to deploy the Silvereal application using Docker on Windows

REM Check if Docker is installed
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Error: Docker is not installed or not in your PATH.
    echo Please install Docker Desktop for Windows and try again.
    exit /b 1
)

REM Check if .env.local exists
IF NOT EXIST .env.local (
    echo Error: .env.local file not found. Please create it with your NEON_DATABASE_URL.
    exit /b 1
)

REM Load environment variables from .env.local
for /f "tokens=*" %%a in (.env.local) do (
    set %%a
)

REM Check if NEON_DATABASE_URL is set
IF "%NEON_DATABASE_URL%"=="" (
    echo Error: NEON_DATABASE_URL is not set in .env.local
    exit /b 1
)

REM Build and start the Docker containers
echo Building and starting Docker containers...
docker-compose up --build -d

IF %ERRORLEVEL% EQU 0 (
    echo Deployment completed successfully!
    echo Your application is now running at http://localhost:3000
) ELSE (
    echo Error occurred during deployment. Please check the Docker logs.
)
