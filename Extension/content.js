console.log("running");
function farrow(selectedForwardLink) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      window.location.href = selectedForwardLink.href;
      console.log("farrow")
    }
  });
}

function barrow(selectedBackwardLink) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      window.location.href = selectedBackwardLink.href;
      console.log("barrow")
    }
  });
}

function frel() {
  console.log("Using frel markers");
  var links = document.querySelectorAll("a[rel='next']");

  if (links.length > 0) {
    var selectedForwardLink = links[0];
    console.log("Captured with frel");
    selectedForwardLink.style.border = "1px solid red";
    return selectedForwardLink;
  }
}

function brel() {
  console.log("Using brel markers");
  var links = document.querySelectorAll("a[rel='prev']");

  if (links.length > 0) {
    var selectedBackwardLink = links[0];
    console.log("Captured with brel");
    selectedBackwardLink.style.border = "1px solid green";
    return selectedBackwardLink;
  }
}

function fhref() {
  var links = document.querySelectorAll("a");
  var oldlink;
  var selectedForwardLink = null;
  if (links.length > 0) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].innerText.toLowerCase() === "next") {
        console.log("found one");
        selectedForwardLink = links[i];
        selectedForwardLink.style.border = "1px solid red";
        if (oldlink != selectedForwardLink) {
          console.log("Link with href selected!");
        }
        oldlink = selectedForwardLink;
        break;
      }
    }
    farrow(selectedForwardLink);
  }
  return selectedForwardLink;
}

function bhref() {
  console.log("hi")
  var links = document.querySelectorAll("a");
  var oldlink;
  var selectedBackwardLink = null;
  console.log("bhref")
  if (links.length > 0) {
    console.log("links exist")
    for (var i = 0; i < links.length; i++) {
      if (links[i].innerText.toLowerCase() === "prev") {
        console.log("found one");
        selectedBackwardLink = links[i];
        selectedBackwardLink.style.border = "1px solid green";
        if (oldlink != selectedBackwardLink) {
          console.log("Link with bhref selected!");
        }
        oldlink = selectedBackwardLink;
        break;
      }
    }
    barrow(selectedBackwardLink);
  }
  return selectedBackwardLink;
}

document.addEventListener("DOMContentLoaded", function() {
  if (!fhref()) {
    farrow(frel())
  }
  console.log("2")
  if (!bhref()){
    console.log("b")
    barrow(brel())
  }
});
