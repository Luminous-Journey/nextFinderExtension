function arrow(selectedLink, dir) {
  // when a key is pressed
  document.addEventListener("keydown", function (event) {
    // if that key is an arrow key with the correct direction
    if (event.key === "Arrow"+dir) {
      // move to next page
      window.location.href = selectedLink.href;
    }
  });
}

function rel(f) {
  // set for either forward or backward
  if (f=="f"){
    text = "next"
    dir = "Right"
  }
  else if (f=="b"){
    text = "prev"
    dir = "Left"
  }
  // get everything that is marked with rel='selected text'
  var links = document.querySelectorAll("a[rel='"+ text +"']");
  // select the first one
  if (links.length > 0) {
    var selectedLink = links[0];
    selectedLink.style.border = "2px solid red";
  }
  // send to arrow with direction
  arrow(selectedLink, dir)
}

function href(f) {
  var links = document.querySelectorAll("a");
  var oldlink;
  var selectedLink = null;
  var text
  var dir
  if (f="f"){
    text = "next"
    dir = "Right"
    // decide which button (forwar or backward(this is forward))
  }
  else if (f="b"){
    text = "prev"
    dir = "Left"
    // decide which button (forwar or backward(this is backward))
  }
  // get all the links in the page
  if (links.length > 0) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].innerText.toLowerCase() === text) {
        // if one is valid set it to selectedLink and outline it
        selectedLink = links[i];
        selectedLink.style.border = "2px solid red";
        if (oldlink != selectedLink) {
          console.log("Link with href selected!");
        }
        oldlink = selectedLink;
        break;
      }
    }
    // send that to the arrow function with a direction decided at the begining
    arrow(selectedLink, dir);
  }
  // return for logic at bottom
  return selectedLink;
}

document.addEventListener("DOMContentLoaded", function() {
  // wait until page loads
  if (!href("f")) {
    // run if there are no valid links 
    rel("f")
  }
  if (!href("b")){
    // run if there are no valid links 
    rel("b")
  }
});
