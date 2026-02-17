#!/bin/bash

# ==============================================================================
# EquiGov Deployment Script - Production Version
# ==============================================================================
# This script automates the deployment of the EquiGov platform using Docker.
# 1. Validates environment
# 2. Pulls latest code from GitHub
# 3. Builds and restarts Docker containers
# 4. Performs health checks
# ==============================================================================

set -e # Exit on any error

# --- Configuration ---
REPO_URL="https://github.com/zaur777/Shareholder-Manage-Platform.git" # Replace with actual repo URL
PROJECT_DIR="/home/ubuntu/equigov"
LOG_FILE="/var/log/equigov-deploy.log"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# --- Helpers ---
log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

error_exit() {
    log "ERROR: $1"
    exit 1
}

# --- 1. Dependency Check ---
log "Checking system dependencies..."
command -v docker >/dev/null 2>&1 || error_exit "Docker is not installed."
command -v docker compose >/dev/null 2>&1 || error_exit "Docker Compose is not installed."

# --- 2. Code Synchronization ---
if [ ! -d "$PROJECT_DIR" ]; then
    log "Project directory not found. Cloning repository..."
    git clone "$REPO_URL" "$PROJECT_DIR" || error_exit "Failed to clone repository."
else
    log "Project directory exists. Pulling latest changes..."
    cd "$PROJECT_DIR"
    git fetch --all
    git reset --hard origin/main || error_exit "Failed to pull latest code."
fi

cd "$PROJECT_DIR"

# --- 3. Build & Deploy ---
log "Building and starting containers..."
# Build without cache to ensure fresh deployment for production
docker compose build --no-cache
docker compose up -d --remove-orphans || error_exit "Failed to start containers."

# --- 4. Post-Deployment & Health Check ---
log "Cleaning up old Docker resources..."
docker image prune -f

log "Verifying container health..."
sleep 5
STATUS=$(docker inspect --format='{{.State.Status}}' equigov_prod 2>/dev/null || echo "not-found")

if [ "$STATUS" == "running" ]; then
    log "SUCCESS: EquiGov is live and healthy."
else
    error_exit "Container status is: $STATUS. Check 'docker logs equigov_prod' for details."
fi

log "------------------------------------------------"
