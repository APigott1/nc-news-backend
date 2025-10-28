# About

This project creates and seeds test and development databases with demo news data. A server can be setup to handle api endpoints from which to send data to a client. This project was created with Test Driven Development and the tests are available to be run. A hosted version is available below with a production database.

# Hosted version  

[nc-news-backend](https://nc-news-backend-sgvu.onrender.com/api)

# Getting Started
## Prerequisites

[Node.js](https://nodejs.org/en/download) v24.7.0  
[PostgreSQL](https://www.postgresql.org/download/) v16.10

## Cloning

To clone this repository run:
```
git clone https://github.com/APigott1/nc-news-backend.git
```

## npm packages

To install the npm dependencies run:

```
npm install
```

## .env files

To be able to connect to the databases create the following files in the root directory of the repository:

.env.development  
with contents

```
PGDATABASE=nc_news
```

.env.test  
with contents

```
PGDATABASE=nc_news_test
```

If you cannot connect to the databases with the above .env files, add the following to each:

```
PGUSER=<username>
PGPASSWORD=<password>
PGHOST=localhost
PGPORT=5432
```

note: your username and password need to match the .pgpass file made when setting up psql

## Usage

### Database setup

To initialise the databases:

```
npm run setup-dbs
```

To seed the test database:

```
npm run test-seed
```

To seed the dev database:

```
npm run seed-dev
```

### Starting a local server

To start a local instance of a server:
```
npm start
```

You can then make requests to the api through a browser or other http request interfaces (eg. Insomnia) starting with the url http://localhost:9090

### Running the tests

```
npm test
```

## Database Schema

![Schema:](assets/schema.png)

_(generated from: [dbdiagram.io](https://diagram.io))_
