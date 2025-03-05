function getVideoDetails(videoUrl) {
    const videoTitleElement = document.querySelector(
        "h1.style-scope.ytd-watch-metadata yt-formatted-string"
    );
    const videoTitle = videoTitleElement
        ? videoTitleElement.innerText
        : "Unknown";
    const videoId = new URL(videoUrl).searchParams.get("v");
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return { videoTitle, videoUrl, thumbnailUrl };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "sendTabUrl") {
        const videoUrl = message.url;
        const videoDetails = getVideoDetails(videoUrl);
        chrome.runtime.sendMessage({ action: "videoDetails", data: videoDetails });
    }
});

// Send video details immediately after the content script loads
const videoUrl = window.location.href;
if (videoUrl.includes("youtube.com/watch")) {
    const videoDetails = getVideoDetails(videoUrl);
    console.log("🎥 Sending video details to background:", videoDetails);
    chrome.runtime.sendMessage({ action: "videoDetails", data: videoDetails });
}