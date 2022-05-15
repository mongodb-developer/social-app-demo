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
  `https://data.mongodb-api.com/app/${process.env.AUTH0_AUDIENCE}/endpoint/data/beta/action`;

  try {
    switch (req.method) {
      // Add search functionality here
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
