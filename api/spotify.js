import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ statusCode: 400, error: "Missing 'url' parameter" });
  }

  try {
    const apiResponse = await fetch(
      `https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`
    );
    const data = await apiResponse.json();

    if (!data || data.statusCode !== 200 || !data.medias || data.medias.length === 0) {
      return res.status(404).json({ statusCode: 404, error: "Track not found or invalid URL" });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ statusCode: 500, error: "Failed to fetch track" });
  }
}