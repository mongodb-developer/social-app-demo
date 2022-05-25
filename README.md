# Lesson 10

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/9-lesson)

---

## Goal

The goal of this lesson is to deploy our completed project to Vercel.

> Be sure to switch to the `10-lesson` branch in your local environment.

## Task 1: Create a Vercel Account

If you don't already have a [Vercel account](https://vercel.com/signup), create one.

## Task 2: Create a Vercel Project

1. From the Vercel dashboard, create a new project.
1. Choose **Continue with GitHub**.
1. Find the **social-app-demo** repository in the list and choose **Import**.
1. Under **Environment Variables**, add all of your environment variables from your [`.env.local`](./.env.local) file.
    - Change `AUTH0_BASE_URL` to your Vercel domain. (e.g. `https://social-app-demo.vercel.app`)
1. Click **Deploy**.
1. Go back to the main dashboard and select your new project.
1. From the **Settings** tab, click **Git**.
1. Change the **Production Branch** to `10-lesson` and save.
1. Redeploy?

## Task 3: Update Auth0 settings

1. In your Auth0 application, update the following fields under **Settings**:
- Allowed Callback URLs: `http://localhost:3000/api/auth/callback, https://*.vercel.app/api/auth/callback`
- Allowed Logout URLS: `http://localhost:3000, https://*.vercel.app, http://*.vercel.app`
- Allowed Web Origins: `https://*.vercel.app`

---

Great job! Your application is now deployed and you can open it from the **Overview** tab in Vercel.

## Bonus: Team Collaboration

Team up with someone and browse to each other's deployed applications. Leave some flutters to let them know it's working.
