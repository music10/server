FROM node:15.5.1-buster

WORKDIR /server

RUN apt-get update && apt-get install -y libpango*
COPY . .

RUN yarn

ARG SPOTIFY_AUTH_TOKEN
ENV SPOTIFY_AUTH_TOKEN=${SPOTIFY_AUTH_TOKEN}

RUN yarn build
CMD ["yarn", "start:prod"]

EXPOSE 3000
EXPOSE 3001
