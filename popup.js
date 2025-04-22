// When the button is clicked, open the current video in normal YouTube

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('open-in-youtube-btn').addEventListener('click', async () => {
    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    try {
      const url = new URL(tab.url);
      let videoId = null;
      if (url.hostname.includes('youtube.com')) {
        if (url.pathname === '/embed/' || url.pathname.startsWith('/embed/')) {
          videoId = url.pathname.split('/embed/')[1]?.split('/')[0];
        } else if (url.pathname === '/watch') {
          videoId = url.searchParams.get('v');
        }
      }
      if (videoId) {
        const normalUrl = `https://www.youtube.com/watch?v=${videoId}&noembed=1`;
        chrome.tabs.create({ url: normalUrl });
      } else {
        alert('No YouTube video detected on this tab.');
      }
    } catch (e) {
      alert('Unable to parse the current tab URL.');
    }
  });
});
