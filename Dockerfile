FROM node:current-alpine3.12

WORKDIR /server

# Bundle app source
COPY . .

RUN yarn
RUN yarn build
CMD ["yarn", "start:prod"]

EXPOSE 3000
EXPOSE 3001
