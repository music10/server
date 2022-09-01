# Music10 Server ![Server test & publish](https://github.com/music10/server/workflows/Server%20test%20&%20publish/badge.svg)

### Description

TODO

### NPM-scripts

- _prebuild_ - clear old build artifacts
- _build_ - build application
- _format_ - format sources
- _start_ - run application
- _start:dev_ - Run application with --watch
- _start:debug_ - Run application with debug tools
- _start:prod_ - Run application using production params
- _lint_ - Lint source using eslint
- _test_ - Run unit tests using Jest
- _test:watch_ - Run unit tests using Jest with --watch
- _test:cov_ - Run unit tests using Jest with coverage
- _test:debug_ - Run unit tests using Jest with debug tools
- _test:e2e_ - Run e2e tests
- _doc_ - Generate documentation using compodoc
- _deploy:doc_ - Deploy documentation
- _deploy:coverage_ - Deploy test-coverage result

### Local run

```bash
npm install
npm start
```

### Deploy

```bash
docker pull docker.pkg.github.com/music10/server/server:latest
docker rm --force musiq
docker run -p 5001:3001 -p 5000:3000 -d --name musiq --restart always docker.pkg.github.com/music10/server/server:latest
```

### Example nginx config

```nginx
server {
    server_name musiq.dergunov.net;
    root /home/musiq/web;

    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }
    listen [::]:80;
    listen 80;
}
server {
    server_name api.musiq.dergunov.net;

    location / {
        try_files @server;
    }

    location @server {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_request_buffering off;
            proxy_buffering off;
    }

    listen [::]:80 ipv6only=on;
    listen 80;
}
server {
    server_name ws.musiq.dergunov.net;

    location / {
        try_files @server;
    }

    location @server {
            proxy_pass http://127.0.0.1:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_request_buffering off;
            proxy_buffering off;
    }

    listen [::]:80 ipv6only=on;
    listen 80;
}
```
