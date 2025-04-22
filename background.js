// // Listens for navigation to YouTube video pages and redirects to the embed URL
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     const url = new URL(details.url);
//     // Only match watch pages with a v parameter
//     if (url.pathname === '/watch' && url.searchParams.has('v')) {
//       const videoId = url.searchParams.get('v');
//       // Prevent redirect loop if already on embed
//       return {
//         redirectUrl: `https://www.youtube.com/embed/${videoId}`
//       };
//     }
//     return {};
//   },
//   {
//     urls: [
//       "*://www.youtube.com/watch?v=*"
//     ],
//     types: ["main_frame"]
//   },
//   ["blocking"]
// );
