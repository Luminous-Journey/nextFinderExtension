let isEnabled = false;

// Function to inject content script into the current tab
function injectContentScript(tabId) {
  chrome.tabs.executeScript(tabId, { file: "content.js" });
}

// Function to send the toggle state to the popup
function sendToggleStateToPopup() {
  chrome.runtime.sendMessage({ action: "updateToggleState", isEnabled });
}

// Listen for toggle message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "toggle") {
    isEnabled = !isEnabled;
    chrome.storage.local.set({ "isEnabled": isEnabled });
    sendResponse({ isEnabled });
    sendToggleStateToPopup();
  } else if (message.action === "getToggleState") {
    sendResponse({ isEnabled });
  }
});

// Listen for tab navigation events
chrome.webNavigation.onCommitted.addListener(details => {
  // Check if the navigation is in the main frame
  if (details.frameId === 0) {
    // Inject content script into the tab
    injectContentScript(details.tabId);
  }
});

// Listen for initial tab load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // Inject content script into the tab
    injectContentScript(tabId);
  }
});

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener(command => {
  if ((command === "navigateNext" || command === "navigatePrev") && isEnabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { command });
    });
  }
});
