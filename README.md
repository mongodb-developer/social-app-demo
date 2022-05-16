# Lesson 9

<- Back to [previous lesson]()

---

## Goal

The goal of this lesson is to enable search within MongoDB Atlas by creating a search index. We should be able to search for flutters by taking advantage of fuzzy searching.

## Task 1: Create a search index

1. From the Atlas dashboard, select **Database** from the left menu.
1. Click the **Browse Collections** button on your cluster.
1. Select the **Search** tab.
1. Click the **Create Index** button.
1. Choose the **Visual Editor** and click **Next**.
1. You can name your index or leave it set to `default`.
1. Choose the `social_butterfly` database and `flutters` collection, then press **Next**.
1. Press **Create Search Index**.

## Task 2: Add Search `term` API endpoint

Use the one of the other endpoint files as a starter to create `pages/api/flutter/[term].js`.

This route will receive the search term as a query parameter.

This route should get all flutters that match the search term.

The term can be retrieved from the query parameter: `req.query.term`.

The Data API endpoint for this route should be `/aggregate`.

To use the search index, include a `pipeline` in the request body.

Here is an example pipeline using a search index:

```js
[
  {
    $search: {
      index: 'default', // The name of the index
      text: {
        query: 'Hello', // The search term
        path: {
          'wildcard': '*' // The fields to search
        }
      }
    }
  }
]
```

After the search pipeline stage, add a sort stage that sorts descending on the `postedAt` field.

### Test

Test your search functionality by running the application and using the search input in the header.

Notice that the search results are very strict. You have to be exact with the search term.

We can fix this by adding a `fuzzy` parameter to our search pipeline stage.

<details>
<summary>Show solution</summary>

```js
case "GET":
  const term = req.query.term;
  const readData = await fetch(`${baseUrl}/aggregate`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      pipeline: [
        {
          $search: {
            index: "default",
            text: {
              query: term,
              path: {
                wildcard: "*",
              },
              fuzzy: {}
            },
          },
        },
        { $sort: { postedAt: -1 } },
      ],
    }),
  });
  const readDataJson = await readData.json();
  res.status(200).json(readDataJson.documents);
  break;
```
</details>
<br>

---

Great job! Let's move on to the [next lesson]() ->
