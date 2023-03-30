FROM node:18.15-bullseye

WORKDIR /app

RUN npm install -g vite

COPY package.json .
COPY package-lock.json .

RUN npm install
