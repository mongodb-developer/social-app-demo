# Lesson 4

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/3-lesson)

---

## Goal

The goal of this lesson is to test accessing the Data API. We'll use a Bash script to test the API.

> Reference the [Data API Resource Docs](https://www.mongodb.com/docs/atlas/api/data-api-resources/) for hints.

> Be sure to switch to the `4-lesson` branch in your local environment.

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

> Note your Data API App ID separately from your URL Endpoint.

Each request must include the following headers:
- `Content-Type`: `application/json`
- `Access-Control-Request-Headers`: `*`
- `api-key`: `<Data API Key>`

Each request must include, at minimum, the following in body:
- `dataSource`: `<cluster name>`
- `database`: `<database name>`
- `collection`: `<collection name>`

## Task 1: Add connection variables

- Open the [findOne.sh](./findOne.sh) file and add your connection variables in items 1 and 2.
- If your cluster name is not `Cluster0`, change the `dataSource` variable, item #5, to your cluster name.

## Task 2: Test the `findOne` endpoint

> If you are on MacOS or Linux, you'll need to add permissions to the `findOne.sh` file.
> `chmod +x ./findOne.sh`

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

> Do not commit changes to your repo as this would commit your API key. Reset this branch before switching to the next one by running: `git reset --hard`.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/5-lesson) ->

> Be sure to switch to the `5-lesson` branch in your local environment.