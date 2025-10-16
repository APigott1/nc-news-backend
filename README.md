# Getting Started

## .env files

To be able to connect to the databases create the following files in the root directory of the repository:

.env.development  
with  
PGDATABASE = nc_news

.env.test  
with  
PGDATABASE = nc_news_test

For linux users, please add the following to the files:  
PGUSER=username  
PGPASSWORD=password  
PGHOST=localhost  
PGPORT=5432
