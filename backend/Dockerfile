# Use an official Python image
FROM python:3.10-slim

# Install system dependencies for mysqlclient
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libmariadb-dev-compat \
    libmariadb-dev \
    && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy requirements file to install Python dependencies
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . /app/

# Expose the backend port
EXPOSE 5000

# Command to run your Flask app
CMD ["python", "run.py"]
