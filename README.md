# Back End Project - Reddit-Clone API

![image](https://user-images.githubusercontent.com/83911563/156884050-c45f7bbb-2445-4f7e-b761-10a7fdaa7336.png)


## Built by Ben Weston (https://github.com/benwestondigital)

## Description

This news project clones the back-end functionality of Reddit using Node.js/Express to serve articles, users, topics and commends in JSON format using a PostgreSQL database.

You can access the API at: [Heroku](https://ben-reddit-project.herokuapp.com/api)

## Setting up / Installation Requirements

### Prerequisites

- Node.js 17.x [Node.js](https://nodejs.org/en/)
- PostgreSQL 12.9 [psql](https://www.postgresql.org/)

### Dependencies

- dotenv 14.x [dotenv](https://www.npmjs.com/package/dotenv)
- express 4.x [express](https://www.npmjs.com/package/express)
- pg 8.x [node-postgres](https://www.npmjs.com/package/pg)
- pg-format 1.x [pg-format](https://www.npmjs.com/package/pg-format)

### Dev Dependencies

- jest 27.x [jest](https://www.npmjs.com/package/jest)
- supertest 6.x [supertest](https://npmjs.com/package/supertest)
- nodemon 2.x [nodemon](https://www.npmjs.com/package/nodemon)

### Cloning

- In your terminal:

    `$ git clone https://github.com/benwestondigital/reddit-clone-project.git`

    `$ cd reddit-clone-project`

## Running the Application

- Initialising in Node / installing dependencies
    `npm install`

You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`. Into these files add `PGDATABASE=<database_name here>` with your choice of database name for both the dev and test environment.

There is a provided `db` folder with some data, a [setup.sql](./db/setup.sql) file and a `seeds` folder.

- Setup database

`$ npm run setup-dbs && npm run seed`

## Testing the application

To run the provided tests

`$ npm t`

To run the dev environment

`$ npm run dev`

This can then be accessed at [http://127.0.0.1:9090/api](http://127.0.0.1:9090/api)

I recommend the Google Chrome extension [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer//gbmdgpbipfallnflgajpaliibnhdgobh) for inspecting the available endpoints.

