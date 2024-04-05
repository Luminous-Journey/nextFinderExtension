document.addEventListener("keydown", event => {
  // Retrieve the toggle state from local storage
  chrome.storage.local.get("isEnabled", data => {
    const isEnabled = data.isEnabled || false;

    // Retrieve the toggle state from the background script
    chrome.runtime.sendMessage({ action: "getToggleState" }, response => {
      const isExtensionEnabled = response.isEnabled;

      // Proceed only if the extension and toggle are enabled
      if (isEnabled && isExtensionEnabled) {
        const directionKeys = {
          ArrowRight: ["next", "forward", "right"],
          ArrowLeft: ["prev", "backward", "left", "back"]
        };

        const direction = directionKeys[event.key];
        if (direction) {
          const links = document.querySelectorAll("a[href], area[href]");
          let linkToNavigate = null;

          // Find the link matching the direction
          for (const link of links) {
            if (direction.some(text => link.textContent.toLowerCase().includes(text))) {
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
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener(message => {
  // Update the global toggle state when a message is received
  window.isEnabled = message.isEnabled;
});
