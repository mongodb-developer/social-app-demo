# Lesson 3

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/2-lesson)

---

## Goal

The goal of this lesson is to load a sample data set into your MongoDB database.

## Task 1: Load Sample Data

Use either the MongoDB VS Code extension or MongoDB Compass to load sample data into your cluster.

### Option 1: MongoDB VS Code Extension

Install the [MongoDB VS Code extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) if you haven't already.

1. From the MongoDB tab in the activity bar, add a MongoDB connection using your connection string. Be sure to update the username and password.
1. Right click your cluster and choose "Add Database...".
1. Name the database `social_butterfly` and the collection `flutters`.
1. Add a line after the collection is created to insert the sample data using the [`data.json`](data.json) file.
  ```js
  db.flutters.insertMany(...paste data.json here...)
  ```
1. Run the file by clicking the play button at the top right.
1. You should see the sample data in the collection after refreshing the cluster on the MongoDB tab.

### Option 2: MongoDB Compass

Install [MongoDB Compass](https://www.mongodb.com/try/download/compass) if you don't have it already.

1. Use your connection string to connect to your database. Be sure to update the username and password.
1. Create a new database called `social_butterfly` with a collection named `flutters`.
1. Navigate to the collection and select the **Import Data** button. Use the file browser to select the [`data.json`](data.json) file in this branch. Choose **JSON** as the file type and click **Import**.
1. You should now see the sample data in the collection.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/4-lesson) ->

> Be sure to switch to the `4-lesson` branch in your local environment.
