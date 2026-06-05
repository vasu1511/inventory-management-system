FROM python:3.12-slim

WORKDIR /app

# environment optimization
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# system dependencies (safe for most backend apps)
RUN apt-get update && apt-get install -y gcc

# install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# expose port
EXPOSE 8000

# production server
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]