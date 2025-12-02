# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
COPY backend/app.py .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Default port (Railway overrides this)
ENV PORT=5000

# Run the application - use shell form to expand $PORT
CMD gunicorn app:app --bind 0.0.0.0:$PORT
