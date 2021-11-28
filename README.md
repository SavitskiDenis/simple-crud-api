# Simple CRUD API
Application use in-memory database underneath.

Before running applicaion, run the `npm i` command for install required packages.

The application can work in two modes:
* `Development`. Run the `npm run start:dev` command to start application in development mode.
* `Production`. Run the `npm run start:prod` command to start application in production mode.

# API
Path `/person`:
* **GET** `/person` is used to return all persons
* **GET** `/person/${personId}` is used to return person by id
* **POST** `/person` is used to add new person and return new object
* **PUT** `/person/${personId}` is used to update person by id and return updated object
* **DELETE** `/person/${personId}` is used to delete person by id

Persons are stored as `objects` that have following properties:
* `id` — unique identifier (`string`, `uuid`) generated on server side
* `name` — person's name (`string`, **required**)
* `age` — person's age (`number`, **required**)
* `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

# Testing
Before running the tests, run the application in development (`npm run start:dev`) or production (`npm run start:prod`) mode. If the application is running now, restart it.

Run the `npm run test` command to run all the tests.