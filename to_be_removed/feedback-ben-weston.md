# BE Northcoders NC News Portfolio Check List

## Readme - Remove the one that was provided and write your own

- [ ✅ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

_All of this can be done later on so don't worry about any of the above not ticked :) _

## General

- [ ✅ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.) --- added to `to_be_removed folder`
- [ ✅ ] Functions and variables have descriptive names

## Creating tables

- [ ✅ ] Use `NOT NULL` on required fields
- [ ✅ ] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()` - CURRENT_TIMESTAMP is also fine here :)

## Inserting data

- [ ✅ ] Drop tables and create tables in seed function in correct order
- [ ✅] Make use of pg-format to insert data in the correct order

## Tests

- [ ✅ ] Seeding before each test
- [ ✅ ] Descriptive `it`/`test` block descriptions
- [ ✅ ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [ ✅ ] Evidence of building up complex query endpoints using TDD
- [ ✅ ] Ensure all tests are passing
- [ ✅ ] Cover all endpoints and errors - _all essential endpoints covered_

- `GET /api/topics`

  - [ ✅ ] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [ ✅ ] Status 200, single article object (including `comment_count`)
  - [ ✅ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ✅ ] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/articles/:article_id`

  - [ ✅ ] Status 200, updated single article object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ✅ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to article.

- `GET /api/articles`

  - [ ✅ ] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [ ✅ ] Status 200, default sort & order: `created_at`, `desc`
  - [ ✅ ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ ✅ ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ ✅ ] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [ ✅ ] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ ✅ ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ ✅ ] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [ ✅ ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [ ✅ ] Status 200, array of comment objects for the specified article
  - [ ✅ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ✅ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ✅ ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [ ✅ ] Status 201, created comment object
  - [ ✅ ] Status 400, invalid ID, e.g. string of "not-an-id" -
  - [ ✅ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ✅ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ✅ ] Status 404, username does not exist
  - [ ✅ ] Status 201, ignores unnecessary properties

- `DELETE /api/comments/:comment_id`

  - [ ✅ ] Status 204, deletes comment from database
  - [ ✅ ] Status 404, non existent ID, e.g 999
  - [ ✅ ] Status 400, invalid ID, e.g "not-an-id" - _this works but is not tested._

- `GET /api`

  - [ ✅ ] Status 200, JSON describing all the available endpoints

## Routing

- [ ✅ ] Split into api, topics, users, comments and articles routers
- [ ✅ ] Use `.route` for endpoints that share the same path

## Controllers

- [ ✅ ] Name functions and variables well
- [ ✅ ] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`) - _you have consistently used catch blocks in your controllers so I am happy to see this_

## Models

- Protected from SQL injection
- [ ✅ ] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
- [ ✅ ] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ✅ ] Use `LEFT JOIN` for comment counts

## Errors

- [ ✅ ] Use error handling middleware functions in app and extracted to separate directory/file
- [ ✅ ] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `GET /api/users`

  - [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

  - [ ] Status 200, responds with single user object
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to comment.

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics

#FEEDBACK

### I Loved...

- _the way you have created variables in your tests to make the reading of the data back from the response body more sematic and readable_

- _excellent use of async/await_

- _code is every neat and readable_

### I would like to see...

SEEDING:

- _Make sure that your primary keys in your table have the NOT NULL constraint applied. These primary keys define a set of rows in a table that can be referenced by another table - so for that we reason, we can not allow them to be NULL. We dont't have to make this check with SERIAL as this will auto-generate an INT in every place for each row_

TESTING:

- _make sure we check that the array is the length we expect it to be if we are using forEach - we might expect 10 - but only 7 come back...if we only have a forEach to check the structure, we would still pass that test._

- _/api/articles/:article_id - PATCH - I noticed that you make a check to make sure that the key of the object provided is "inc_votes. We don't however have any tests for when the article_id is invalid or doesn't exist yet - if I put in say an article_id of 900 - I get back an empty object. Your tests covers the 400 error by default because I imagine the PSQL error is one of the codes you are checking for but it would nice to see this behaviour tested for._

- _/api/articles/:article_id/comments - GET - If the article number is an invalid type, we get a 400 back and a error message: - "Bad Request", which is awesome! But there is no test for this behavious. It may seem nitpicky but whilst we are solving the behaviour and giving back the right thing, it should also be tested for._

- _/api/articles/:article_id/comments - POST - Similar feedback to above. _

SQL:

- _we need to make sure that we use a LEFT JOIN when using our aggregate functions. There may be some use cases where we don't. But it's important that we don't leave anything out when joining our tables. If we only use the JOIN constraint when joining two tables. Anything from the first table(LEFT) that isn't referenced by anything in the second table(RIGHT), will not be brought over. LEFT JOIN fixes this issues for us by bringing everything over from the first table, regardless of if it is referenced, which would be handy if we were doing some kind of count as 0 would be useful information also_

##SUMMARY

Excellent work here Ben and I think you are well on the way to having an amazing backend project. What I would say now is keep chipping away at those endpoints and test a thoroughly as you can.
