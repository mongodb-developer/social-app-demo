# Lesson 4

<- Back to [previous lesson]()

---

## Goal

The goal of this lesson is to test accessing the Data API. We'll use Postman to test the API.

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

## Task 1: Add connection variables

From the **Data API** page in your Atlas dashboard, select the **Test Your API** button on the top right. In the modal, select the **Run in Postman** button.

> You can run from either a local installation of Postman or from the web version. This does require that you have a Postman account.

Import the collection into any of your workspaces.

On the **Variables** tab, add values to the following variables:
- `URL_ENDPOINT`: `https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/beta`
- `API_KEY`: `<Data API Key>`
- `DATA_SOURCE`: `<cluster name>`
- `DATABASE`: `social_butterfly`
- `COLLECTION`: `flutters`

Press the **Save** button on the top right to save the variables.

## Task 2: Test the `findOne` endpoint

Expand **MongoDB Data API** in your workspace and select the **Find Document** request.

Notice that this is a `POST` request and is using the `/action/findOne` endpoint. This endpoint is used to find a single document.

Select the **Headers** tab and notice the headers that are added along with your API key from your variables. 

Now select the **Body** tab. Notice the `dataSource`, `database`, and `collection` variables that are added from your variables.

For now, remove the `filter` line and click the **Send** button.

If should respond with the first document in the collection.

## Task 3: Add a filter to the `findOne` request

Let's add the filter back in. We are going to filter for a document that contains "dad-a-base" in the `body` field. We can use the `$regex` operator to do this.

```js
"filter": { "body": { "$regex" : "dad-a-base", "$options" : "i" } }
```

Click the **Send** button again and you should get the document.

---

Great job! Let's move on to the [next lesson]() ->