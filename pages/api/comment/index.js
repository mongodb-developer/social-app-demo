export default async function handler(req, res) {
  const baseUrl =
    "https://data.mongodb-api.com/app/data-eojcl/endpoint/data/beta/action";

  switch (req.method) {
    case "GET":
      const readData = await fetch(`${baseUrl}/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGODB_DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "social_leaf",
          collection: "comments",
        }),
      });

      const readDataJson = await readData.json();
      res.status(200).json(readDataJson.documents);
      break;
    case "POST":
      const comment = req.body;
      const insertData = await fetch(`${baseUrl}/insertOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGODB_DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "social_leaf",
          collection: "comments",
          document: comment,
        }),
      });

      const insertDataJson = await insertData.json();
      res.status(200).json(insertDataJson);
      break;
    case "PUT":
      const updateData = await fetch(`${baseUrl}/updateOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGODB_DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "social_leaf",
          collection: "comments",
          filter: { _id: { "$oid": req.body._id } },
          update: { $set: {
            body: req.body.body,
          } },
        }),
      });

      const updateDataJson = await updateData.json();
      res.status(200).json(updateDataJson);
      break;
    case "DELETE":
      const deleteData = await fetch(`${baseUrl}/deleteOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGODB_DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "social_leaf",
          collection: "comments",
          filter: { _id: { "$oid": req.body._id } },
        }),
      });

      const deleteDataJson = await deleteData.json();
      res.status(200).json(deleteDataJson);
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}
