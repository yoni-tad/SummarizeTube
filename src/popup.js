chrome.storage.local.get('videoDetails', (data) => {
    if(data.videoDetails) {
        document.getElementById("thumbnail").src = data.videoDetails.thumbnailUrl;
        document.getElementById("videoTitle").innerText = data.videoDetails.videoTitle;
        
        console.log(data.videoDetails.videoUrl);
    } else {
        console.log('No video data found!');
    }
});
