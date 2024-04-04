document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    const direction = event.key === "ArrowRight" ? "next" : "prev";
    const links = document.querySelectorAll("a[href], area[href]");
    let linkToNavigate = null;

    for (const link of links) {
      if (link.textContent.toLowerCase().includes(direction)) {
        linkToNavigate = link.href;
        break;
      }
    }

    if (linkToNavigate) {
      window.location.href = linkToNavigate;
    }
  }
});
