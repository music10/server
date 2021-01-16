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
sudo docker rm --force musiq
sudo docker pull docker.pkg.github.com/music10/server/server:latest
sudo docker run -p 5001:3001 -p 5000:3000 -d --name musiq --restart always docker.pkg.github.com/music10/server/server:latest
```
