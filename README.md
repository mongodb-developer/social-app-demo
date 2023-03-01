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
1. Select **Next.js** as the framework.
1. Under **Environment Variables**, add all of your environment variables from your [`.env.local`](./.env.local) file.
1. Click **Deploy**.
    - This initail deploy will not really do anything since the `main` branch does not contain our final code.
1. Go back to the main dashboard and select your new project.
    - Take note of your custom domain. (Example: `https://socialbutterfly.vercel.app`)
1. From the **Settings** tab, click **Git**.
1. Change the **Production Branch** to `10-lesson` and save.
1. Navigate to the **Environment Variables** tab.
1. Change `AUTH0_BASE_URL` to your custom Vercel domain noted earlier. 
1. To redeploy, you'll need to make a new commit to the `10-lesson` branch. You can simply open the `README.md` file, add a space somewhere, and make a new commit.

## Task 3: Update Auth0 settings

1. In your Auth0 application, update the following fields under **Settings**:
- Allowed Callback URLs: `http://localhost:3000/api/auth/callback, https://*.vercel.app/api/auth/callback`
- Allowed Logout URLS: `http://localhost:3000, https://*.vercel.app, http://*.vercel.app`
- Allowed Web Origins: `https://*.vercel.app`

---

Great job! Your application is now deployed and you can open it from the **Overview** tab in Vercel or by navigating to your custom Vercel domain.

## Bonus: Team Collaboration

Team up with someone and browse to each other's deployed applications. Leave some flutters to let them know it's working.
