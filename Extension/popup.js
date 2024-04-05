document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");

  // Get current toggle state when popup is opened
  chrome.runtime.sendMessage({ action: "getToggleState" }, response => {
    const isEnabled = response.isEnabled;
    toggleButton.textContent = isEnabled ? "Disable Navigation" : "Enable Navigation";

    // Toggle state when button is clicked
    toggleButton.addEventListener("click", () => {
      chrome.runtime.sendMessage("toggle", response => {
        const isEnabled = response.isEnabled;
        toggleButton.textContent = isEnabled ? "Disable Navigation" : "Enable Navigation";
      });
    });
  });
});
