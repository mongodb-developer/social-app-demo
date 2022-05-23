# Lesson 4

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/3-lesson)

---

## Goal

The goal of this lesson is to test accessing the Data API. We'll use a Bash script to test the API.

> Reference the [Data API Resource Docs](https://www.mongodb.com/docs/atlas/api/data-api-resources/) for hints.

## Available Data API endpoints

The endpoints available from the Atlas Data API are:
- `/action/find`
- `/action/findOne`
- `/action/insertOne`
- `/action/insertMany`
- `/action/updateOne`
- `/action/updateMany`
- `/action/replaceOne`
- `/action/deleteOne`
- `/action/deleteMany`
- `/action/aggregate`

## Request parameters needed

Each endpoint must use the `POST` method.

The base URL for each endpoint is: `https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/beta`.

Each request must include the following headers:
- `Content-Type`: `application/json`
- `Access-Control-Request-Headers`: `*`
- `api-key`: `<Data API Key>`

Each request must include, at minimum, the following in body:
- `dataSource`: `<cluster name>`
- `database`: `<database name>`
- `collection`: `<collection name>`

> The following tasks are dependent on the `json` npm package. If you don't have it, you can install it with `npm install -g json`.

## Task 1: Add connection variables

- Open the [findOne.sh](./findOne.sh) file and add your connection variables in items 1 and 2.

## Task 2: Test the `findOne` endpoint

- From the terminal, run `./findOne.sh`.

You should recieve the first document in the collection.

## Task 3: Add a filter to the `findOne` request

In the [findOne.sh](./findOne.sh) file, in item #8, you will find a commented filter. Comment line 27 and uncomment lines 28-33.

We are going to filter for a document that contains "dad-a-base" in the `body` field. We can use the `$regex` operator to do this.

```js
"filter": { "body": { "$regex" : "dad-a-base", "$options" : "i" } }
```

Save the file and run it again: `./findOne.sh`.

You should get the specific document we searched for now.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/5-lesson) ->

> Be sure to switch to the `5-lesson` branch in your local environment.