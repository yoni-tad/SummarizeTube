chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((e) => console.error(e));

  
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status == "complete") {
    if (tab.url.includes("youtube.com/watch")) {
      await chrome.sidePanel.setOptions({
        tabId,
        path: "../index.html",
        enabled: true,
      });
      chrome.tabs.sendMessage(tabId, { action: "sendTabUrl", url: tab.url });
    } else {
      await chrome.sidePanel.setOptions({
        tabId,
        enabled: false,
      });
    }
  }
});
