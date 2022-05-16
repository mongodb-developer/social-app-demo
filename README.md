# Lesson 8

<- Back to [previous lesson]()

---

## Goal 

The goal of this lesson is to add functionality to like/unlike a flutter. We should be able to display how many total likes a flutter has, and if the current user has liked the flutter.

## Task 1: Add `like` API endpoint

Use the `pages/api/flutter/index.js` file as a starter to create `pages/api/flutter/like/index.js`.

This route needs to be able to only update the likes field of a flutter.

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
<br>

---

Great job! Let's move on to the [next lesson]() ->
