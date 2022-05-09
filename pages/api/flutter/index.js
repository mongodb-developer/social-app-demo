import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const baseUrl =
      "https://data.mongodb-api.com/app/data-vbhdy/endpoint/data1/beta/action";

    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            // "api-key": process.env.MONGODB_DATA_API_KEY,
            'jwtTokenString': accessToken,
          },
          body: JSON.stringify({
            dataSource: "Cluster0",
            database: "social_butterfly",
            collection: "flutters",
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
            // "api-key": process.env.MONGODB_DATA_API_KEY,
            'jwtTokenString': accessToken,
          },
          body: JSON.stringify({
            dataSource: "Cluster0",
            database: "social_butterfly",
            collection: "flutters",
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
            // "api-key": process.env.MONGODB_DATA_API_KEY,
            'jwtTokenString': accessToken,
          },
          body: JSON.stringify({
            dataSource: "Cluster0",
            database: "social_butterfly",
            collection: "flutters",
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
            // "api-key": process.env.MONGODB_DATA_API_KEY,
            'jwtTokenString': accessToken,
          },
          body: JSON.stringify({
            dataSource: "Cluster0",
            database: "social_butterfly",
            collection: "flutters",
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
