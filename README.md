# The MongoDB Atlas Data API in the Jamstack: The Serverless Dream!

Live Demo: [https://social-mongodb-demo.vercel.app/](https://social-mongodb-demo.vercel.app/)

## Introduction

Do you love the Jamstack? Do you love to create all of the boilerplate code required to connect to databases in their Jamstack applications?

This workshop will show you how you can connect to MongoDB Atlas in your Jamstack application with minimal effort and without using any drivers.

## What we'll cover in this workshop

- ~15 minutes of slides explaining Jamstack, serverless, and how the MongoDB Atlas Data API fits into these.
- Hands-on exercises resulting in you building a fully functional, deployed application. 

## Prerequisites

In order to successfully complete the tasks in this workshop, you should have:

- Familiarity with JavaScript
- Accounts: MongoDB Atlas, GitHub, Vercel, Auth0. (All Free)
- Node.js installed on your computer (12.2x / 14.x)
- Code Editor (VS Code recommended)

That's it 🙌 *(no prior knowledge of MongoDB is required)*

## Slides

- 

## Hands-on exercises

This repo is broken up into several branches. Each branch contains a set of exercises and builds upon the previous exercises.

Throughout the workshop, you'll be working on the following exercises:
1. [Exercise 1]()
2. [Exercise 2]()
3. [Exercise 3]()
4. [Exercise 4]()
5. [Exercise 5]()
6. [Exercise 6]()
7. [Exercise 7]()
8. [Exercise 8]()
9. [Exercise 9]()
10. [Exercise 10]()

---

Let's get started with the [first exercise]()!

## Exercise 1: Create a MongoDB Atlas Cluster

- Create cluster
- Enable Data API
- Create Data API Key
- Test from dashboard using Postman
- Enable network and user access (only because we will load sample data from VS Code or Compass)

## Exercise 2: Load Sample Data

- Use MongoDB VS Code extension to load sample data from `.json` file

## Exercise 3: Clone workshop repo

- Clone workshop repo
- Install dependencies
- Set up `.env` file
 - `MONGODB_DATA_API_KEY=<YOUR_API_KEY>`

## Exercise 4: Create serverless functions

- Create `/find` endpoint
- Create `/insertOne` endpoint
- Create `/updateOne` endpoint
- Create `/deleteOne` endpoint

## Exercise 5: Set up user authentication

- Auth0 settings:
  - **Create Application**
  - Name and select **Regular Web Applications**
  - From Settings, note the **Domain**, **Client ID**, and **Client Secret**
  - Add **Allowed Callback URLs**: `http://localhost:3000/api/callback`
  - Add **Allowed Logout URLs**: `http://localhost:3000`
  - **Create API**
  - Name anything, identifier must be Data API ID

- Data API App settings:
  - From **Authentication**, edit **Custom JWT Authentication**
  - Enable Provider
  - Verification Method: Use a JWK URI
  - JWK URI: `https://<account>.us.auth0.com/.well-known/jwks.json`
  - Save
  - Enable "Create User" on each Data API endpoint
  - Set up Rules / Roles

- Project updates:
  - Configure Auth0
    ```env
    AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
    AUTH0_BASE_URL='http://localhost:3000'
    AUTH0_ISSUER_BASE_URL='https://<account>.us.auth0.com'
    AUTH0_CLIENT_ID='<client_id>'
    AUTH0_CLIENT_SECRET='<client_secret>'
    AUTH0_AUDIENCE=<data_api_id>
    AUTH0_SCOPE=openid email profile
    ```
  - Add dynamic API route
    ```js
    // pages/api/auth/[...auth0].js
    import { handleAuth } from '@auth0/nextjs-auth0';

    export default handleAuth();
    ```
  - Add `UserProvider` component
    ```js
    // pages/_app.js
    import React from 'react';
    import { UserProvider } from '@auth0/nextjs-auth0';

    export default function App({ Component, pageProps }) {
      return (
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      );
    }
    ```

## Exercise 6: Add "Likes" functionality

- Create `/like` endpoint
- Set Realm permissions to allow users to like posts

## Exercise 7: Set up Search

- Create index
- Set up search functions

## Exercise 8: Set up Aggregation

- Create aggregation pipelines for search, and pagination

## Exercise 9: Deploy to Vercel

Update Auth0 settings:
- Allowed Callback URLs: `http://localhost:3000/api/auth/callback, https://*.vercel.app/api/auth/callback`
- Allowed Logout URLS: `http://localhost:3000, https://*.vercel.app, http://*.vercel.app`
- Allowed Web Origins: `https://*.vercel.app`
- Add environment variables

## Exercise 10: Team up and test implementations