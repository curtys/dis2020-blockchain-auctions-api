# DIS2020 - Blockchain Auctions API

## Requirements

For local development:

* Node v12.9.1 or higher
* [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation): `npm install -g truffle`
* [Ganache](https://github.com/trufflesuite/ganache-cli): `npm install -g ganache-cli`
* [Redis](https://redis.io/) (or use Docker)

To start up the application stack with Docker:

* [Docker](https://www.docker.com/get-started)
* [docker-compose](https://docs.docker.com/compose/install/)

## Setup

**Before starting the server, copy .env.example as .env and fill in the TODO fields.** The provided values are defaults for Redis and Ganache.

Install the dependencies and node modules:

    $ npm install

To compile the contracts in `/contracts` run

    $ truffle compile

Afterwards run the server with

    $ npm start

It's possible to startup the application stack with docker-compose:

    $ docker-compose up -d # Starts the api server, Redis and Ganache

### Cleanup Docker volumes

    $ docker-compose down --volumes