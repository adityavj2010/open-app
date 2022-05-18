# Open App Backend

[//]: # (## Description)
### Framework

We have completed the backend using nest framework

Docs:- https://docs.nestjs.com/

### Environment 

This application required mysql backend, smtp mail and one single port to run the application.

To configure the application goto env.ts 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deploying using docker

```bash
# First time setup
$ sh install.sh

# code only update
$ sh update-backend.sh
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Architecture

This application follows a restful architecture.

We have divided the backend in following separate application logic:-
1. Users
2. Staff
3. Business hours
4. Business services
5. Appointments

## APIs

We have implemented swagger api manager.
To view api's goto URL:PORT/swagger

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


