# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
COPY backend/app.py .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Set environment variable
ENV PORT=5000

# Run the application
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
