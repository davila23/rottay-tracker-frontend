




<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1200/1*feM_-VHhK670LlEQekesKg.png" width="320" alt="Logo" />
</p>
  
<p align="center">A Node.js CQRS/ES Swagger API Microservice </p>




## Description

Proof of concept CQRS Architecture with Nestjs, Typescript, EventStore running in docker



## Dependency Table
| Name        | Version           |
| ------------- |:-------------: |
| [EventStore](https://eventstore.org)      | latest |
| [Node.js](https://nodejs.org)      | Dubnium      |
| [TypeScript](https://www.typescriptlang.org) | 3      |
| [Docker Compose](https://docker.com) | 3      |


## Installation

```bash
$ yarn
```

## Running the app

```bash
# run
$ yarn start

# run using with Docker
$ ./scripts/up.sh    # to start
$ ./scripts/down.sh  # to stop
```


Swagger Explorer URL: http://localhost:7070/api

Event Store URL: http://localhost:2113
