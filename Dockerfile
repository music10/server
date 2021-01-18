FROM node:current-alpine3.12

WORKDIR /server

RUN apk add --update --no-cache python pkgconfig pixman && ln -sf python /usr/bin/python

# Bundle app source
COPY . .

RUN yarn

ARG SPOTIFY_AUTH_TOKEN
ENV SPOTIFY_AUTH_TOKEN=${SPOTIFY_AUTH_TOKEN}

RUN yarn build
CMD ["yarn", "start:prod"]

EXPOSE 3000
EXPOSE 3001
