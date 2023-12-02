console.log("running")
function arrow(selectedLink) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        window.location.href = selectedLink.href
        return true;
      }
    });
  
}

function rel() {
  console.log("Using rel markers");
  var links = document.querySelectorAll("a[rel='Next']");

  if (links.length > 0) {
    var selectedLink = links[0]
    console.log("Captured with rel")
    selectedLink.style.border = "2px solid green";
    return selectedLink
  }
}

function href() {
  var links = document.querySelectorAll("a")
  var oldlink
  var selectedLink = null
  if (links.length > 0) {
    console.log("Using href markers");
    for (var i = 0; i < links.length; i++) {
      if (links[i].innerText.toLowerCase() === "next") {
        selectedLink = links[i];
        selectedLink.style.border = "2px solid red"
        if (oldlink != selectedLink) {
          console.log("Link with href selected!")
        }
        oldlink = selectedLink;
        break
      }
    }
    arrow(selectedLink)
  }
  return selectedLink
}

if (href() === null){
  rel
}
