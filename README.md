
## Description

Proof of concept CQRS Architecture with Nestjs, Typescript, EventStore running in docker.

The big picture :

<p align="center">
  <img src="https://miro.medium.com/max/1202/1*qCy2-p3v-9sbagBpex1CrA.png" width="320" alt="Logo" />
</p>

Events Flow :

<p align="center">
  <img src="https://miro.medium.com/max/1400/1*thQY-4Enoc-66V3724AOCA.png" width="600" alt="Logo" />
</p>


## Dependency Table
| Name        | Version           |
| ------------- |:-------------: |
| [EventStore](https://eventstore.org)      | latest |
| [Node.js](https://nodejs.org)      | Dubnium      |
| [TypeScript](https://www.typescriptlang.org) | 3      |
| [Docker Compose](https://docker.com) | 3      |
| [Postgres](https://www.postgresql.org/) | latest     |


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

## Swagger

URL: http://localhost:7070/api


<p align="center">
  <img src="https://miro.medium.com/max/1400/1*r-UR2jA0fkNqU8OyC1g-cQ.png" width="600" alt="Logo" />
</p>


## Swagger
URL: http://localhost:2113

<p align="center">
  <img src="https://miro.medium.com/max/1400/1*UYEGsbo99M8jlx4DWZgqng.png" width="600" alt="Logo" />
</p>


## Postgres

```bash

Postgres: > command : psql -h localhost -U postgres 
          > psw     : postgres

```


