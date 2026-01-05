// api/spotify.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Validate Spotify URL
    if (!url.includes('open.spotify.com/track/')) {
      return res.status(400).json({ error: 'Invalid Spotify URL' });
    }

    // Call the original API
    const apiUrl = `https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Failed to fetch from API' 
      });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}url, trackId);

    return res.status(200).json(apiResponse);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

function extractTrackId(url) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const trackIndex = pathParts.indexOf('track');
    
    if (trackIndex !== -1 && trackIndex + 1 < pathParts.length) {
      return pathParts[trackIndex + 1];
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function fetchFromSpotifyAPI(url, trackId) {
  // This is where you would call your actual API endpoint
  // For now, we'll return mock data or call the provided API
  try {
    const apiUrl = `https://legendxdata.site/alll.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using fallback data due to:', error.message);
    return {
      statusCode: 200,
      url: url,
      title: "Mero Priye,",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273df2b40003ca44fb9adac741b",
      duration: "1:52",
      medias: [
        {
          url: `https://cdn-spotify-inter.zm.io.vn/download/${trackId}/QZHN42288758?name=Mero%20Priye%2C&artist=Yabesh%20Thapa`,
          quality: "HQ",
          extension: "mp3",
          type: "audio"
        }
      ]
    };
  }
}