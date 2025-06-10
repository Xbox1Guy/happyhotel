function showSeason(season) {
  document.getElementById('season1').style.display = season === 1 ? 'grid' : 'none';
  document.getElementById('season2').style.display = season === 2 ? 'grid' : 'none';
  document.getElementById('tab1').classList.toggle('active', season === 1);
  document.getElementById('tab2').classList.toggle('active', season === 2);
}

function playVideo(url) {
  const overlay = document.getElementById('overlay');
  const frame = document.getElementById('videoFrame');
  frame.src = url;
  overlay.style.display = 'flex';
}

function closeVideo() {
  const overlay = document.getElementById('overlay');
  const frame = document.getElementById('videoFrame');
  frame.src = '';
  overlay.style.display = 'none';
}

async function loadEpisodes() {
  const res = await fetch('episodes.json');
  const data = await res.json();

  ['season1', 'season2'].forEach(season => {
    const container = document.getElementById(season);
    container.innerHTML = '';
    data[season].forEach(ep => {
      const div = document.createElement('div');
      div.className = 'episode';
      div.innerHTML = `
        <img src="\${ep.thumb}" alt="\${ep.title}">
        <div class="episode-title">\${ep.title}</div>
      `;
      div.onclick = () => playVideo(ep.url);
      container.appendChild(div);
    });
  });
}

document.addEventListener('DOMContentLoaded', loadEpisodes);
