# Lesson 6

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/5-lesson)

---

## Goal

The goal of this lesson is to get an overview of how the Atlas Functions and HTTPS Endpoints are set up in the Atlas dashboard.

## Task 1: Open the Atlas Data API App

You can get to the Atlas Data API App in two ways:
1. From the Atlas dashboard, select **Database** from the left menu, then select the **Linked Atlas App**.
1. From the Atlas dashboard, select the **Atlas App Services** tab, then select the **Data API App**.

From this page, you can see the HTTPS Endpoints, and other settings for the Data API App.

## Task 2: HTTPS Endpoints

Select **HTTPS Endpoints** from the left menu.

Here you will see the list of pre-generated HTTPS Endpoints from the Data API. Choose the `find` endpoint. 

Since we'll be customizing user authentication in the following lesson, we'll need to set the **Create User Upon Authentication** option to `On`.

## TEMP TASK: Create a custom endpoint

> The above 2 tasks do not currently work in product. This task will allow us to complete the remaining lessons.

1. Select **HTTPS Endpoints** from the left menu.
1. Click **Add An Endpoint**.
1. Route: `/createUser`
1. Method: `POST`
1. Respond With Result: On
1. Add a new function:
    - Function Name: `createUser`
    - Leave default function.
1. Create User Upon Authentication: On
1. Save.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/7-lesson) ->

> Be sure to switch to the `7-lesson` branch in your local environment.
