export default async function handler(req, res) {
  const fetchOptions = {
    method: "",
    headers: {},
  };
  const fetchBody = {};
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch('<url>', '<options>');
        const readDataJson = await readData.json();
        res.status(  ).json(  );
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
