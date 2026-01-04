// Telegram toggle
const tgCircle = document.getElementById('tgCircle');
tgCircle.addEventListener('click', ()=>{
  const links = document.getElementById('tgLinks');
  links.style.display = links.style.display==='flex'?'none':'flex';
});

// Mobile keyboard fix
let originalBottom = 25;
let windowHeight = window.innerHeight;
window.addEventListener('resize', () => {
  const vh = window.innerHeight;
  if(vh < windowHeight * 0.75){
    tgCircle.style.bottom = '10px';
  }else{
    tgCircle.style.bottom = originalBottom + 'px';
  }
});

// Fetch button
document.getElementById('fetchBtn').addEventListener('click', fetchData);
async function fetchData(){
  const url = document.getElementById('url').value.trim();
  const platform = document.getElementById('platform').value;
  const result = document.getElementById('result');
  if(!url){result.innerHTML="❌ Please enter a URL"; return;}
  result.innerHTML="⏳ Fetching...";

  try{
    const res = await fetch(`/api/fetch?platform=${platform}&url=${encodeURIComponent(url)}`);
    const data = await res.json();
    if(!data||!data.medias||data.medias.length===0){
      result.innerHTML="❌ Failed to fetch media"; return;
    }

    let html=`<img src="${data.thumbnail}" alt="Thumbnail">
              <h3>${data.title}</h3>`;
    data.medias.forEach(m=>{
      const typeLabel = m.type==='audio'?'Audio':m.type==='video'?'Video':'Image';
      html+=`<a class="download" href="${m.url}" target="_blank">
                Download ${typeLabel} (${m.quality||m.extension})
             </a>`;
    });
    result.innerHTML=html;

  }catch(e){
    console.error(e);
    result.innerHTML="⚠️ Error fetching media";
  }
}