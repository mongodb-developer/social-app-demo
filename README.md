# Lesson 7

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/6-lesson)

---

## Goal

The goal of this lesson is to set up user authentication to limit access to endpoints and limit users ability to modify certain data. 

> Be sure to switch to the `7-lesson` branch in your local environment.

## Task 1: Set up Auth0 application

Sign up for an [Auth0 account](https://auth0.com/signup?place=header&type=button&text=sign%20up), if you don't already have one.

From the Auth0 dashboard, create a new application.
1. Select **Applications** under **Applications** from the left menu.
1. Click **Create Application**.
1. Name your application anything and select **Regular Web Applications**.
1. Click **Create**.
1. From the **Settings** tab, note the **Domain**, **Client ID**, and **Client Secret**. (You will need these later.)
1. Add to **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
1. Add to **Allowed Logout URLs**: `http://localhost:3000`
1. Click **Save Changes**.

From the Auth0 dashboard, select **APIs** under **Applications** from the left menu.
1. Click **Create API**
1. Name it anything and set the identifier as your **Data API ID**.
1. Click **Create**.

## Task 2: Set up Atlas authentication settings

From the Atlas dashboard:
1. In your App Services app, navigate to the **Authentication** tab, and then edit **Custom JWT Authentication**.
1. Enable Provider.
1. Set **Verification Method** to: Use a JWK URI
1. Set **JWK URI**: `https://<auth0 domain>/.well-known/jwks.json`
    - Replace `<auth0 domain>` with your Auth0 domain that you noted earlier.
1. Click **Save**.

## Task 3: Add trigger to create users

1. Select **Triggers** from the left menu.
1. Slect **Add a Trigger**.
1. Trigger Type: Authentication
1. Name: `AddUserToDatabase`
1. Enabled: **On**
1. Action Type: **Create**
1. Provider: **Custom JWT Authentication**
1. Event Type: **Function**
1. Function: **New Function**
    - Name: `addUserToDatabase`
    ```js
    exports = function(authEvent) {
      const user = authEvent.user;
      const mongodb = context.services.get("Cluster0");
      const usersCollection = mongodb.db("social_butterfly").collection("users");
      usersCollection.insertOne({
        ...user
      });
    };
    ```
    - Replace `Cluster0` with the name of your MongoDB cluster if it is different.
1. Click **Save**.

## Task 4: Set rules for the `flutters` collection

From the Atlas Data API App:
1. Select **Rules** from the left menu.
1. Select the `flutters` collection.
1. Click **Skip (start from scratch)**.
1. Type `owner` for the *Role Name*.
1. Apply When should be:
    ```
    { "user.id": "%%user.id" }
    ```
1. For *Document Permissions*, select all.
1. For *Field Permissions*, select **Read and write all fields**.
1. Click **Save** in the top right.
1. Add another role by clicking the **Add Role** button.
1. Choose the **readAll** preset role and click the **Add preset role** button.

## Task 5: Set rules for the `user` collection

From the Atlas Data API App:
1. Select the `users` collection.
1. Click **Skip (start from scratch)**.
1. Type `owner` for the *Role Name*.
1. Apply When should be:
    ```
    { "id": "%%user.id" }
    ```
1. For *Document Permissions*, select all.
1. For *Field Permissions*, select **Read and write all fields**.
1. Click **Save** in the top right.

## Task 6: Add environment variables

We need to add environment variables in order to connect to Auth0.
1. Add the following environment variables to your `.env.local` file:
    ```env
    AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
    AUTH0_BASE_URL='http://localhost:3000'
    AUTH0_ISSUER_BASE_URL='https://<auth0 domain>'
    AUTH0_CLIENT_ID='<client_id>'
    AUTH0_CLIENT_SECRET='<client_secret>'
    AUTH0_AUDIENCE='<Data_API_App_ID>'
    AUTH0_SCOPE=openid email profile
    ```
    - Replace all placeholders with your Auth0 information.
    - For `AUTH0_SECRET`, run: `openssl rand -hex 32` in your terminal to generate a 32 bytes value. Place this as the value for `AUTH0_SECRET`.

## Overview of changes to the code base

1. `pages/api/auth/[...auth0].js`
    - This file handles all of the authentication routes for the Auth0 API. (login, logout, etc.)
1. `pages/index.js`
    - We are using the Auth0 method `withPageAuthRequired` to protect our main application page, requiring the user to be logged in.
1. `pages/api/flutter/index.js`
    - We are now using Auth0 to protect this endpoint, and we are getting the user's access token to pass to the Data API.
    - Instead of `api-key`, we are now using the `jwtTokenString` for authentication to the Data API.
1. `pages/api/user/index.js`
    - We have a new `user` route that gets and updates the user's data.

## Task 7: Install dependencies and test

Because we are in a new branch, we will need to install the dependencies for this branch. Then we can start the application.

```bash
npm install
npm run dev
```

Open the browser and navigate to `http://localhost:3000`.

You should now *only* be able to update or delete your own flutters.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/8-lesson) ->

> Be sure to switch to the `8-lesson` branch in your local environment.
