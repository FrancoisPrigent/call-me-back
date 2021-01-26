FROM node:alpine

ENV APP_PATH = /var/www

WORKDIR $APP_PATH

ENV COMPANY_FILES_PATH = ${APP_PATH}/build/src/companyFiles

COPY package.*json ../

RUN npm install

COPY . .

CMD npm run build-watch