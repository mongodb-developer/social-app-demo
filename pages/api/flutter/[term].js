import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      jwtTokenString: accessToken,
    },
  };
  const fetchBody = {
    dataSource: "Cluster0",
    database: "social_butterfly",
    collection: "flutters",
  };
  const baseUrl =
    "https://data.mongodb-api.com/app/data-vbhdy/endpoint/data1/beta/action";

  try {
    switch (req.method) {
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
      default: //Method Not Allowed
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
