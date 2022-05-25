# Lesson 2

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/1-lesson)

---

## Goal

The goal of this lesson is to create a MongoDB Atlas Cluter and enable the Atlas Data API.

## Task 1: Sign up for a MongoDB Atlas Account
 
Sign up for a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register2) if you don't already have one.

## Task 2: Create a MongoDB Atlas Cluster

Create a free shared MongoDB Atlas Cluster if you don't already have one. Leave the default name of `Cluster0`.

If you have an existing cluster, you can use it. Take note of your cluster name if it is anything other than `Cluster0`.

## Task 3: Enable the Atlas Data API

1. From the Atlas dashboard, select **Data API** from the left menu.
1. Enable the Data API for your cluster.
1. Take note of your **URL Endpoint**.

## Task 4: Create a Data API Key

1. From the **Data API** page, select the **Create API key** button at the top right.
1. Name your key anything you want, then select the **Generate API Key** button.
1. Copy the API key and save it somewhere (you will not be able to see it again)

> Technically, this is all we have to do in order to enable the Data API. The next 2 tasks will allow us to connect to our database and load sample data in our next lesson.

## Task 5: Enable network and user access

1. Select **Database Access** from the left menu.
    - Add a new user. Save the user name and password for later.
1. Select **Network Access** from the left menu
    - Add an IP address to the access list. (Either your IP address or allow access from anywhere).

## Task 6: Get your database connection string

1. Select **Database** from the left menu.
1. Select the **Connect** button on your cluster.
1. Choose "Connect using MongoDB Compass".
1. Copy the connection string and save it for later.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/3-lesson) ->

> Be sure to switch to the `3-lesson` branch in your local environment.
