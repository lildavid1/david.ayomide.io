FROM python:latest

WORKDIR /app

COPY /project /app

RUN ["flask", "run"]
