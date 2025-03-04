function getVideoDetails() {
    const videoTitleElement = document.querySelector("h1.style-scope.ytd-watch-metadata yt-formatted-string");
    const videoTitle = videoTitleElement ? videoTitleElement.innerText : 'Unknown';
    const videoUrl = window.location.href;
    const videoId = new URL(videoUrl).searchParams.get('v');
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return {videoTitle, videoUrl, videoId, thumbnailUrl};
}

setTimeout(() => {
    const videoDetails = getVideoDetails();
    console.log("🎥 Sending video details to background:", videoDetails);

    chrome.runtime.sendMessage({action: "videoDetails", data: videoDetails});
}, 2000);