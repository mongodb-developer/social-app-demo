# Lesson 6

<- Back to [previous lesson]()

---

## Goal

The goal of this lesson is to set up user authentication to limit access to endpoints and limit users ability to modify certain data. 

## Task 1: Set up Auth0 application

Sign up for an [Auth0 account](https://auth0.com/signup?place=header&type=button&text=sign%20up), if you don't already have one.

From the Auth0 dashboard, create a new application.
1. Select **Applications** under **Applications** from the left menu.
1. Click **Create Application**.
1. Name your application anything and select **Regular Web Applications**.
1. Click **Create**.
1. From the **Settings** tab, note the **Domain**, **Client ID**, and **Client Secret**. (You will need these later.)
1. Add to **Allowed Callback URLs**: `http://localhost:3000/api/callback`
1. Add to **Allowed Logout URLs**: `http://localhost:3000`

From the Auth0 dashboard, select **APIs** under **Applications** from the left menu.
1. Click **Create API**
1. Name it anything and set the identifier as your Data API ID.

## Task 2: Set up Atlas authentication settings
From the Atlas dashboard:
1. Select **Database** from the left menu. 
1. Select the **Linked Realm App** named "data".
1. From **Authentication**, edit **Custom JWT Authentication**.
1. Enable Provider.
1. Set **Verification Method** to: Use a JWK URI
1. Set **JWK URI**: `https://<account>.us.auth0.com/.well-known/jwks.json`
  - Replace `<account>` with the beginning of your Auth0 domain.
1. Click **Save**
1. Enable "Create User" on the `Find` Data API endpoint
  - This is currently not enabled in production. We may have to manually create users for testing during the dry run.

## Task 3: Set rules for the `flutters` collection

From the Atlas Data API Realm App:
1. Select **Rules** from the left menu.
1. Select the `flutters` collection.
1. Choose the template: Users can read all data, but only write their own data.
1. Set the **Field Name For User ID** to `user.id`.
1. Click **Configure Collection**.
1. Click **Save**.

## Task 4: Add environment variables

We need to add environment variables in order to connect to Auth0.
1. Because we are in a different branch, rename the `.env.local.example` file to `.env.local`, add the following lines:
  ```env
  AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
  AUTH0_BASE_URL='http://localhost:3000'
  AUTH0_ISSUER_BASE_URL='https://<account>.us.auth0.com'
  AUTH0_CLIENT_ID='<client_id>'
  AUTH0_CLIENT_SECRET='<client_secret>'
  AUTH0_AUDIENCE=<data_api_id>
  AUTH0_SCOPE=openid email profile
  ```
  - Replace all placeholders with your Auth0 information.
  - For `AUTH0_SECRET`, run: `openssl rand -hex 32` in your terminal to generate a 32 bytes value. Place this as the value for `AUTH0_SECRET`.

## Overview of changes to the code base

1. `pages/api/auth/[...auth0].js`
  - This file handles all of the authentication routes for the Auth0 API. (login, logout, etc.)
1. `pages/api/flutter/index.js`
  - We are now using Auth0 to protect this endpoint, and we are getting the user's access token to pass to the Data API.
  - Instead of `api-key`, we are now using the `jwtTokenString` for authentication to the Data API.
1. `pages/api/user/index.js`
  - We have a new `user` route that gets and updates the user's data.

## Task 5: Install dependencies and test

Because we are in a new branch, we will need to install the dependencies for this branch. Then we can start the application.

```bash
npm install
npm run dev
```

Open the browser and navigate to `http://localhost:3000`.

You should now only be able to update or delete your own flutters.

## Task 6: Set rules for the `user` collection

From the Atlas Data API Realm App:
1. Select **Rules** from the left menu.
1. Select the new `users` collection.
1. Choose the template: Users can only read and write their own data.
1. Set the **Field Name For User ID** to `id`.
1. Click **Configure Collection**.
1. Click **Save**.

---

Great job! Let's move on to the [next lesson]() ->
