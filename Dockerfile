FROM node:14-alpine

WORKDIR /app

COPY package.json  .

RUN npm install

COPY . /app

ENV NODE_ENV docker 

# COPY .env.docker ./.env

CMD [ "npm", "run", "start" ]