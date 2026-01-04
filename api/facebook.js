export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL missing" });
  }

  const api = `https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`;

  try {
    const r = await fetch(api);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "API error" });
  }
}