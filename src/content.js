let lastVideoUrl = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendTabUrl") {
    if (request.url != lastVideoUrl) {
      lastVideoUrl = request.url;
      const videoData = getVideoDetails(request.url);
      chrome.storage.local.set({ videoDetails: videoData });
    }
  }
});

function getVideoDetails(videoUrl) {  
  const videoId = new URL(videoUrl).searchParams.get("v");
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return { videoUrl, thumbnailUrl };
}
