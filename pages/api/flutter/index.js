export default async function handler(req, res) {
  const fetchOptions = {};
  const fetchBody = {};
  const baseUrl =
    "https://data.mongodb-api.com/app/<your-data-api-name>/endpoint/data/beta/action";

  try {
    switch (req.method) {
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
