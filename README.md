# Lesson 5

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/4-lesson)

---

## Goal

The goal of this lesson is to get your local application up and running. You should have basic CRUD functionality working by the end of this lesson.

> Be sure to switch to the `5-lesson` branch in your local environment.

## Task 1: Install dependencies

To install the dependencies for this lesson, run the following command in the terminal from the root of the project:

```bash
npm install
```

## Task 2: Add local environment variable

In order to connect using the Atlas Data API, we must provide a `MONGODB_DATA_API_KEY` environment variable with our API key.

You will find a [`.env.local.example`](.env.local.example) file in the root of the project. Rename this file to `.env.local` and add your API key to the `MONGODB_DATA_API_KEY` variable.

## Serverless functions

Next.js has a native api route for handling serverless functions. Within `pages/api/flutter` you will find an [`index.js`](./pages/api/flutter/index.js) file. This file will contain all of the basic CRUD routes for our application to connect to our Atlas Data API.

## Task 3: Define the standard fetch variables that will be used for all requests.

> You can reference the [Atlas Data API docs](https://www.mongodb.com/docs/atlas/api/data-api-resources) for more information.

In the `fetchOptions` variable, you will need to define the `method` and `headers` properties. The method should be set to `POST` and the headers should include a `Content-Type`, `Access-Control-Request-Headers`, and `api-key`.

In the `fetchBody` variable, you will need to define the `dataSource`, which is your Cluster name, the `database` name, and the `collection` name.

In the `baseUrl` variable, replace the `<Data API App ID>` with your Data API App ID. You can find this on the **Data API** page in your Atlas dashboard.

<details>
<summary>Show solution</summary>

```js
const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": process.env.MONGODB_DATA_API_KEY,
  },
};
const fetchBody = {
  dataSource: "Cluster0",
  database: "social_butterfly",
  collection: "flutters",
};
const baseUrl =
  "https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/beta/action";
```

</details>

## Task 4: Create the `find` endpoint

Create within the `switch` statement a `GET` request case.

Within the `GET` case, you should use `fetch` to make a request to the `find` Data API endpoint using the `baseUrl`, `fetchOptions`, and `fetchBody` variables. You will need to `stringify` the body of the request.

> Hint: Since this is an `async` function, you can use the `await` keyword.

After you have received the `json` from the request, return the `json` to the client along with a status code of `200`.

> Hint: The response will contain a top level `documents` property that contains the documents returned from the request.

### Test

To test your application, from the terminal, run the following command:

```bash
npm run dev
```

You can now navigate to `http://localhost:3000/api/flutter/` and see the response. You can also open `http://localhost:3000` to see the application with limited functionality.

<details>
<summary>Show solution</summary>

```js
case "GET":
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      sort: { postedAt: -1 },
    }),
  });
  const readDataJson = await readData.json();
  res.status(200).json(readDataJson.documents);
  break;
```
</details>

## Task 4: Create the `insertOne` endpoint

Create within the `switch` statement a `POST` request case.

Within the `POST` case, create a `flutter` variable and set it equal to the `req.body` property. Our application will pass the new document using the body property of the request.

Within the `POST` case, you should use `fetch` to make a request to the `insertOne` Data API endpoint using the `baseUrl`, `fetchOptions`, and `fetchBody` variables. You will need to `stringify` the body of the request. 

Add to the `body` object a `document` field with its value set to the `flutter` variable.

After you have received the `json` from the request, return the `json` to the client along with a status code of `200`.

> Hint: The response will not contain the document this time, but an indicaiton of what actions were performed on the database.

### Test

Test your application. If it is not already running, from the terminal, run the following command:

```bash
npm run dev
```

You can now navigate to `http://localhost:3000` and test creating a new flutter.

<details>
<summary>Show solution</summary>

```js
case "POST":
  const flutter = req.body;
  const insertData = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      document: flutter,
    }),
  });
  const insertDataJson = await insertData.json();
  res.status(200).json(insertDataJson);
  break;
```
</details>

## Task 5: Create the `updateOne` endpoint

Create within the `switch` statement a `PUT` request case.

Within the `POST` case, you should use `fetch` to make a request to the `updateOne` Data API endpoint using the `baseUrl`, `fetchOptions`, and `fetchBody` variables. You will need to `stringify` the body of the request. 

Add to the `body` object a `filter` to define which document we want to update. This should filter by the `_id` field of the document using the `req.body._id`.

> Hint: You can define an `objectId` using the MongoDB `$oid` operator.

Also, add to the `body` object a `update` field to define the fields of the document that will be updated. Use the `$set` operator to update the flutters `body` field to `req.body.body`.

After you have received the `json` from the request, return the `json` to the client along with a status code of `200`.

> Hint: The response will not contain the document this time, but an indicaiton of what actions were performed on the database.

### Test

Test your application. If it is not already running, from the terminal, run the following command:

```bash
npm run dev
```

You can now navigate to `http://localhost:3000` and test editing and updating an existing flutter.

<details>
<summary>Show solution</summary>

```js
case "PUT":
  const updateData = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      filter: { _id: { $oid: req.body._id } },
      update: {
        $set: {
          body: req.body.body,
        },
      },
    }),
  });
  const updateDataJson = await updateData.json();
  res.status(200).json(updateDataJson);
  break;
```
</details>

## Task 6: Create the `deleteOne` endpoint

Create within the `switch` statement a `DELETE` request case.

Within the `DELETE` case, you should use `fetch` to make a request to the `deleteOne` Data API endpoint using the `baseUrl`, `fetchOptions`, and `fetchBody` variables. You will need to `stringify` the body of the request. 

Add to the `body` object a `filter` to define which document we want to update. This should filter by the `_id` field of the document using the `req.body._id`.

> Hint: You can define an `objectId` using the MongoDB `$oid` operator.

After you have received the `json` from the request, return the `json` to the client along with a status code of `200`.

> Hint: The response will not contain the document this time, but an indicaiton of what actions were performed on the database.

### Test

Test your application. If it is not already running, from the terminal, run the following command:

```bash
npm run dev
```

You can now navigate to `http://localhost:3000` and test deleting an existing flutter.

<details>
<summary>Show solution</summary>

```js
case "DELETE":
  const deleteData = await fetch(`${baseUrl}/deleteOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      filter: { _id: { $oid: req.body._id } },
    }),
  });
  const deleteDataJson = await deleteData.json();
  res.status(200).json(deleteDataJson);
  break;
```
</details>

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/6-lesson) ->

> Be sure to switch to the `6-lesson` branch in your local environment.
