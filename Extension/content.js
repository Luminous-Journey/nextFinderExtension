document.addEventListener("keydown", event => {
  // Retrieve the toggle state from local storage
  chrome.storage.local.get("isEnabled", data => {
    const isEnabled = data.isEnabled || false;

    // Proceed only if the extension is enabled
    if (isEnabled) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const direction = event.key === "ArrowRight" ? "next" : "prev";
        const links = document.querySelectorAll("a[href], area[href]");
        let linkToNavigate = null;

        // Find the link matching the direction
        for (const link of links) {
          if (link.textContent.toLowerCase().includes(direction)) {
            linkToNavigate = link.href;
            break;
          }
        }

        // Navigate to the link if found
        if (linkToNavigate) {
          window.location.href = linkToNavigate;
        }
      }
    }
  });
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener(message => {
  // Update the global toggle state when a message is received
  window.isEnabled = message.isEnabled;
});
