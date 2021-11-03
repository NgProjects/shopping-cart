## Project

[Shopping Cart] backend project to manage shopping cart

## Product Design

<!-- ![app-design](https://user-images.githubusercontent.com/33487350/140169499-e3238f6e-3dbf-4177-9145-75a7a43a1a35.jpg) -->
<!-- ![app-design](https://user-images.githubusercontent.com/33487350/140169943-c08814f6-e1aa-460d-ba8d-6806420bf3b5.jpg) -->
![app-design](https://user-images.githubusercontent.com/33487350/140170092-3e213c76-2331-4400-87aa-6edcf36e666d.jpg)
## Docs
* http://typeorm.io/#/
* https://docs.nestjs.com/

## Setting up environment variable
create a .env file in the project root folder
copy the content of the sample.env to the .env and provide configurations

## App configuration
to be set in the .env
API_PORT=[any port of your choice] e.g 3000
## TypeORM configuration
``` 
TYPEORM_CONNECTION=[database type in this case 'mysql']
TYPEORM_HOST=[your database host/ip]
TYPEORM_USERNAME=[database username]
TYPEORM_PASSWORD=[database password]
TYPEORM_DATABASE=[database name]
TYPEORM_PORT=[database port]

```

#### API Documentation
This API is documented with swagger.
the swagger url is configured in the .env with key as `SWAGGER_URL`
swagger documentation can be with the {ip}/{SWAGGER_URL}
e.g if the SWAGGER_URL=/api in .env and the application is hosted locally,
then the swagger url would be http://localhost:3000/api

## Authentication

The Endpoints in the cart controller need authorization

A default user is created on start up of application
``` 
username = test@email.com
password = password 
```

We can use this user for authentication or we can create a new user with the ` /user/create-user endpoint ` .

We need to call the ` /auth/login ` for authentication.
After authentication a jwt token is generated and sent in the header as `access_token`

![acc_tok](https://user-images.githubusercontent.com/33487350/139799401-73457b9a-18bd-44d2-bd50-00112e9cc548.jpg)




The `access_token` would be used to authorize the call to other endpoint
Using swagger, we can authorize by clicking the authorize button 

![authorize](https://user-images.githubusercontent.com/33487350/139799723-1f19ca22-3537-436a-8cc1-dba205170777.jpg)


and populating the value with the `access_token`

![auth(2)](https://user-images.githubusercontent.com/33487350/139798942-2159e5d8-cf2d-44f0-a0fc-9a3f1fa0cbe2.jpg)

### Migration data

According [typeORM migration guide](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md),
there is a migration file under [src/migrations/](src/migrations) to create default user and populate the sample products in the product table.
The scripts are automatically run in the first start up.

If you are running the project for the first time,
You will need to set this config `TYPEORM_SYNCHRONIZE` to `true` to set up the app database and subsequently set to false

These configurations are needed in order for the migration scripts to run

```
TYPEORM_MIGRATIONS=dist/migrations/*.js
TYPEORM_MIGRATIONS_DIR=dist/migrations
TYPEORM_MIGRATIONS_RUN=true
TYPEORM_MIGRATIONS_TABLE_NAME=MIGRATIONS_HISTORY 
```

## Auth configurations
to be set in the .env
``` 
JWT_SECRET=[hard to guess secret key]
JWT_EXPIRY_TIME=[JWT EXPIRY TIME] in this format 600s, 3000s , 1500s 
```

## Project set up
To set up project manually you need to 
Download and install 
1. node from [https://nodejs.org](https://nodejs.org)
2. MySql from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

Set up the database and update the TypeORM configurations in the environment variable 
sample configuration is 

```

TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=test
TYPEORM_PORT=3306

 ```

 ## Running the app with docker
 Download and install docker from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

 start up docker (endure docker is up and running)

 navigate to the root folder of the application

 run ` docker compose up ` and wait for the app to start up successfully
 
 app would run on port [3000](http://localhost:3000/api/) [http://localhost:3000/api/](http://localhost:3000/api/)

 ## Note:
 Enable these configs

 ```

TYPEORM_MIGRATIONS_RUN=true
TYPEORM_LOGGING=true

 ```

 When starting the app for the very first time 
 in order to set up database and create default user and product - For development puporses only

 Disable on subsequent startups 
```

TYPEORM_MIGRATIONS_RUN=false
TYPEORM_LOGGING=false

 ```

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

