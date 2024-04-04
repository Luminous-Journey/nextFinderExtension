document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");

  // Retrieve toggle state from storage
  chrome.storage.local.get("isEnabled", data => {
    if (data.isEnabled) {
      toggleButton.textContent = "Disable Navigation";
    } else {
      toggleButton.textContent = "Enable Navigation";
    }
  });

  toggleButton.addEventListener("click", () => {
    chrome.runtime.sendMessage("toggle", response => {
      if (response.isEnabled) {
        toggleButton.textContent = "Disable Navigation";
      } else {
        toggleButton.textContent = "Enable Navigation";
      }
    });
  });
});
