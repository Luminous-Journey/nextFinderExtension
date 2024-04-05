document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const toggleText = document.getElementById("toggleText");

  // Get current toggle state when popup is opened
  chrome.runtime.sendMessage({ action: "getToggleState" }, response => {
    const isEnabled = response.isEnabled;
    toggleSwitch.checked = isEnabled;
    toggleText.textContent = isEnabled ? "Navigation on" : "Navigation off";

    // Toggle state when button is clicked
    toggleSwitch.addEventListener("change", () => {
      chrome.runtime.sendMessage("toggle", response => {
        const isEnabled = response.isEnabled;
        toggleSwitch.checked = response.isEnabled;
        toggleText.textContent = (isEnabled ? "Navigation on" : "Navigation off");
      });
    });
  });
});