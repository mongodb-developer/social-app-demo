# Lesson 8

<- Back to [previous lesson](https://github.com/mongodb-developer/social-app-demo/tree/7-lesson)

---

## Goal 

The goal of this lesson is to add functionality to like/unlike a flutter. We should be able to display how many total likes a flutter has, and if the current user has liked the flutter.

> Be sure to switch to the `8-lesson` branch in your local environment.

## Task 1: Add `like` API endpoint

You will find a new starter file for the **like** endpoint: `pages/api/flutter/like/index.js`.

This route should only update the likes field of a flutter.

The request body will contain the flutter `_id`, `userId`, and `action`.

`action` will be the update operator that will be used. When a flutter is liked, the operator will be `$addToSet`. When a flutter is unliked, the operator will be `$pull`.

<details>
<summary>Show solution</summary>

```js
case "PUT":
  const updateData = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      filter: { _id: { "$oid": req.body._id } },
      update: { [req.body.action]: {
        likes: req.body.userId,
      } },
    }),
  });
  const updateDataJson = await updateData.json();
  res.status(200).json(updateDataJson);
  break;
```
</details>

## Task 2: Update App Services Rule

1. From your Data API App Services app, navigate to the **Rules** tab.
1. Select the `flutters` collection.
1. On the **non-owner** role, check then uncheck the `Write` checkbox. (Yes, there's a small bug here 😅)
1. Click the **+ Add Field** button.
1. Type `likes` and click the **Check** button.
1. Select the **Write** checkbox for the `likes` field only.
1. Click the **Save** button.

## Task 3: Test 

Test your application. If it is not already running, from the terminal, run the following command:

```bash
npm run dev
```

You can now navigate to `http://localhost:3000` and test liking and unliking flutters. You should be able to like/unlike any flutter, including those you have not created.

---

Great job! Let's move on to the [next lesson](https://github.com/mongodb-developer/social-app-demo/tree/9-lesson) ->

> Be sure to commit your branch changes and switch to the `9-lesson` branch in your local environment.
