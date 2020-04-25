FROM node:12-alpine
LABEL name="node12:local"

RUN apk update
RUN apk add curl bash git

WORKDIR /usr/src/app

COPY . .

RUN npm install --production
USER node