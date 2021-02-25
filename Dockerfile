FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm i --only=prod

ARG PORT 3000
ENV APP_PORT $PORT
EXPOSE $APP_PORT

COPY . . 

CMD node app