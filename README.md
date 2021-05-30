# Test task for "Atlas Europe"

## Prerequisites
1. **MySQL** server (I used MariaDB)
2. **Node.js**

## How to run
### Install packages for `client` and build the application
```shell script
cd client
npm install
npm run build
```
### Do the same actions for `server`
```shell script
cd server
npm install
npm run prebuild && npm run build
```
### Setup environment
```shell script
cd server
cp example.env .env
```
Create the database, and put yor credentials into `.env` file
```dotenv
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=db_user
DB_PASSWORD=password
DB_DATABASE=db_name
```
### Run migration
```shell script
cd server
npm run migration:run
```
### Start the server app
```shell script
npm run start:prod
```
Or you can start it in dev mode
```shell script
npm run start:dev
```
The application will start on [`http://locahost:3020`](http://locahost:3020)

Also, you can start the frontend app in dev mode
```shell script
cd client
npm run serve
```
In this case the application will be available on [`http://locahost:8080`](http://locahost:8080)
