chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((e) => console.error(e));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if(tab.url && tab.url.includes("youtube.com/watch")) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: "../index.html",
            enabled: true
        });
    } else {
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if(message.action == 'videoDetails') {
        console.log("📡 Forwarding video details to side panel...");
        chrome.storage.local.set({videoDetails: message.data});
    }
})