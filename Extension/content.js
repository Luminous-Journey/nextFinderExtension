chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "selectLink") {
    var links = document.querySelectorAll("a[rel='Next']");
    var oldlink;

    if (links.length > 0) {
      var selectedLink = links[0];
      selectedLink.style.border = "2px solid red";
      if (oldlink != selectedLink){
        console.log("Link with rel='Next' selected!");
      }
      oldlink = selectedLink
      // Add event listener for right arrow key press
      document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
          // Navigate to the selected link
          window.location.href = selectedLink.href;
        }
      });
    } else {
      console.log("No link with rel='Next' found on the page.");
    }
  }
});
