# docker/backend/Dockerfile

FROM python:3.9.1-alpine3.12

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

RUN apk add postgresql-dev

RUN apk add libc-dev
RUN apk add build-essential
RUN pip install -U pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend
