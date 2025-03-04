FROM node:22-alpine

RUN apk update && apk upgrade && apk add bash

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD npm run start:prod