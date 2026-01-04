import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ statusCode: 400, error: "No URL provided" });

        // Call third-party API
        const response = await fetch(`https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ statusCode: 500, error: err.message });
    }
}