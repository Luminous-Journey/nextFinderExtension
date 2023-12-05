function arrow(selectedLink, dir) {
  // when a key is pressed
  document.addEventListener("keydown", function (event) {
    // if that key is an arrow key with the correct direction
    if (event.key === "Arrow" + dir) {
      // move to next page
      window.location.href = selectedLink.href;
    }
  });
}

function rel(f) {
  // set for either forward or backward
  var text;
  if (f === "f") {
    text = ["next"]; // Change to "next" for forward navigation
    dir = "Right";
  } else if (f === "b") {
    text = ["prev", "back"]; // Change to "prev" for backward navigation
    dir = "Left";
  }
  // get everything that is marked with rel='selected text'
  var links = [...document.querySelectorAll("a[rel='" + text + "']")];

  // select the first one
  if (links.length > 0) {
    var selectedLink = links[0];
    // selectedLink.style.border = "1px solid red";
  }
  // send to arrow with direction
  arrow(selectedLink, dir);
}

function findLinkWithText(element, searchTextArray) {
  if (
    element.tagName === "A" &&
    searchTextArray &&
    searchTextArray.some((text) =>
      element.innerText.toLowerCase().includes(text.toLowerCase())
    )
  ) {
    return element;
  }

  for (let i = 0; i < element.children.length; i++) {
    const childResult = findLinkWithText(element.children[i], searchTextArray);
    if (childResult) {
      return childResult;
    }
  }

  return null;
}

function href(f) {
  var links = document.querySelectorAll("a");
  var oldlink;
  var selectedLink = null;
  var text;
  var dir;
  if (f === "f") {
    text = ["next"]; // Change to "next" for forward navigation
    dir = "Right";
  } else if (f === "b") {
    text = ["prev", "back"]; // Change to "prev" for backward navigation
    dir = "Left";
  }

  // Traverse each link and its children to find the one with the specified text
  for (var i = 0; i < links.length; i++) {
    const foundLink = findLinkWithText(links[i], text);
    if (foundLink) {
      selectedLink = foundLink;
      if (f === "f") {
        selectedLink.style.border = "1px solid red";
      } else if (f === "b") {
        selectedLink.style.border = "1px solid green";
      }
      if (oldlink !== selectedLink) {
        console.log("Link with href selected!");
      }
      oldlink = selectedLink;
      break;
    }
  }

  // Send the selected link to the arrow function with the specified direction
  arrow(selectedLink, dir);

  // Return for logic at the bottom
  return selectedLink;
}

function main() {
  // document.addEventListener("DOMContentLoaded", function () {
  // wait until page loads
  if (!href("f")) {
    // run if there are no valid links
    rel("f");
  }
  if (!href("b")) {
    // run if there are no valid links
    rel("b");
  }
  // });
}

main();
