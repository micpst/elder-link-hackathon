FROM python:3.11-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install --upgrade pip && \
    pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv requirements --dev > requirements.txt && \
    pip install -r requirements.txt \
