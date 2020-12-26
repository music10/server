FROM node:current-alpine3.12

WORKDIR /server

# Bundle app source
COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000
