let isEnabled = false;

// Retrieve toggle state from storage on startup
chrome.storage.local.get("isEnabled", (data) => {
  isEnabled = data.isEnabled || false;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "toggle") {
    isEnabled = !isEnabled;
    chrome.storage.local.set({ isEnabled: isEnabled });
    sendResponse({ isEnabled });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "navigateNext" && isEnabled) {
    chrome.tabs.executeScript({ file: "content.js" });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if ((command === "navigateNext" || command === "navigatePrev") && isEnabled) {
    chrome.tabs.executeScript({ file: "content.js" });
  }
});
