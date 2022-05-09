import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const baseUrl =
      "https://data.mongodb-api.com/app/data-vbhdy/endpoint/data1/beta/action";

    switch (req.method) {
      case "PUT":
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            'jwtTokenString': accessToken,
          },
          body: JSON.stringify({
            dataSource: "Cluster0",
            database: "social_butterfly",
            collection: "flutters",
            filter: { _id: { "$oid": req.body._id } },
            update: { [req.body.action]: {
              likes: req.body.userId,
            } },
          }),
        });

        const updateDataJson = await updateData.json();
        console.log(updateDataJson);
        res.status(200).json(updateDataJson);
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
