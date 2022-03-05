# Back End Project - Reddit-Clone API

![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

![API Available Endpoints](https://user-images.githubusercontent.com/83911563/156884330-a7a35be9-0b03-4d14-bc03-47f18f9bf65f.png)

## Website [Hosted Link](https://ben-reddit-project.herokuapp.com/api)

### Built by Ben Weston [github](https://github.com/benwestondigital)

## Description

This news project clones the back-end functionality of Reddit using Node.js and Express to serve articles, users, topics and comments in JSON format using a PostgreSQL database.

The list of available endpoints and their descriptions are shown on the `/api` endpoint.

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
- jest-sorted 1.x [jest-sorted](https://www.npmjs.com/package/jest-sorted)
- supertest 6.x [supertest](https://npmjs.com/package/supertest)
- nodemon 2.x [nodemon](https://www.npmjs.com/package/nodemon)

### Cloning

- In your terminal:

    `$ git clone https://github.com/benwestondigital/reddit-clone-project.git`

    `$ cd reddit-clone-project`

## Running the Application

- Initialising in Node / installing dependencies
    `npm install`

You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`.

> In the `env.development` file, add `PGDATABASE=nc_news`

> In the `env.test` file, add `PGDATABASE=nc_news_test`


There is a provided `db` folder with some data, a [setup.sql](./db/setup.sql) file and a `seeds` folder.

- Setup database

`$ npm run setup-dbs && npm run seed`

To check that the database setup was successful, you can run the following to create a text file `see-my-db.txt` containing all of the database data.

`$ npm run view-db`

## Testing the application

To run the provided tests

`$ npm test`

To run the dev environment

`$ npm run dev`

This can then be accessed at [http://127.0.0.1:9090/api](http://127.0.0.1:9090/api)

I recommend the Google Chrome extension [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) for inspecting the available endpoints.

