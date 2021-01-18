FROM node:current-alpine3.12

WORKDIR /server

ENV MUSL_LOCPATH=/usr/local/share/i18n/locales/musl
RUN apk add --update --no-cache python2 pkgconfig pixman-dev cairo-dev pango-dev make g++ jpeg-dev git cmake make musl-dev gcc gettext-dev libintl
RUN cd /tmp && git clone https://github.com/rilian-la-te/musl-locales.git
RUN cd /tmp/musl-locales && cmake . && make && make install

ENV LANG=ru_RU.UTF-8 \
    LANGUAGE=ru_RU.UTF-8

COPY . .

RUN yarn

ARG SPOTIFY_AUTH_TOKEN
ENV SPOTIFY_AUTH_TOKEN=${SPOTIFY_AUTH_TOKEN}

RUN yarn build
CMD ["yarn", "start:prod"]

EXPOSE 3000
EXPOSE 3001
