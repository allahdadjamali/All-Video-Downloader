import fetch from 'node-fetch';

export default async function handler(req, res){
  const { platform, url } = req.query;
  if(!platform || !url) return res.status(400).json({error:"Missing parameters"});

  try{
    // Proxy API call
    const apiUrl = `https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Optional: sanitize / remove API keys or headers if needed

    res.status(200).json(data);
  }catch(err){
    console.error(err);
    res.status(500).json({error:"Failed to fetch"});
  }
}