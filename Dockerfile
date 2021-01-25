FROM node:alpine

ENV APP_PATH = /var/www

WORKDIR $APP_PATH

COPY package.*json ../

RUN npm install

RUN npm run build

COPY ./built .