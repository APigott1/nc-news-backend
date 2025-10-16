# Getting Started

## .env files

To be able to connect to the databases create the following files in the root directory of the repository:

.env.development  
containing

```
PGDATABASE=nc_news
```

.env.test  
containing

```
PGDATABASE=nc_news_test
```

If it will not connect to the databases with the above .env files add the following to each:

```
PGUSER=<username>
PGPASSWORD=<password>
PGHOST=localhost
PGPORT=5432
```
