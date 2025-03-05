chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((e) => console.error(e));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (info && info.status == "complete") {
    if (tab.url.includes("youtube.com/watch")) {
      await chrome.sidePanel.setOptions({
        tabId,
        path: "../index.html",
        enabled: true,
      });
    } else {
      await chrome.sidePanel.setOptions({
        tabId,
        enabled: false,
      });
    }
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status == "complete") {
    console.log("Tab updated: " + tab.url);

    chrome.tabs.sendMessage(tabId, { action: 'sendTabUrl', url: tab.url });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action == "videoDetails") {
    chrome.storage.local.set({ videoDetails: message.data });
  }
});
