import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ statusCode: 400, error: "No URL provided" });

    const response = await fetch(`https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.statusCode !== 200 || !data.medias.length) {
      return res.status(404).json({ statusCode: 404, error: "Video not found", url });
    }

    const videos = data.medias
      .filter(v => v.type === "video")
      .map(v => ({ quality: v.quality, url: v.url }));

    res.status(200).json({
      statusCode: 200,
      title: data.title,
      thumbnail: data.thumbnail,
      videos
    });

  } catch (err) {
    res.status(500).json({ statusCode: 500, error: err.message });
  }
}