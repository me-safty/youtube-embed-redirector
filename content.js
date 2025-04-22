// Redirects YouTube video pages to their embed version, even on SPA navigation
(function() {
  function redirectIfNeeded() {
    if (window.location.pathname === '/watch') {
      const url = new URL(window.location.href);
      // Skip redirect if noembed=1 is present

      if (url.searchParams.get('noembed') === '1') {
        observer.disconnect()
        return;
      }
      const videoId = url.searchParams.get('v');
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        if (window.location.href !== embedUrl) {
          window.location.replace(embedUrl);
        }
      }
    }
  }
  // Listen for SPA navigation events
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      redirectIfNeeded();
    }
  });
  observer.observe(document, {subtree: true, childList: true});

  // Initial check
  redirectIfNeeded();
})();
