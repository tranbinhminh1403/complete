function handleTagClick(event) {
  const selectedTag = event.target.innerText;
  const contentDiv = document.querySelector(".content");

  document.querySelectorAll(".tag-content button").forEach((tag) => {
    tag.style.borderBottom = "none";
    tag.classList.add("unselected");
  });

  event.target.style.borderBottom = "2px solid rgb(73, 204, 249)";
  event.target.classList.remove("unselected");

  function loadContent(path) {
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        contentDiv.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        contentDiv.innerHTML = "<p>Failed to load content.</p>";
      });
  }

  // Update content based on the selected tag
  switch (selectedTag) {
    case "Tuyển Sinh":
      loadContent("./blue/content1.html");
      break;
    case "Công Việc":
      loadContent("./blue/content2.html");
      break;
    case "Lớp Học":
      loadContent("./blue/content3.html");
      break;
    case "Học Viên":
      loadContent("./blue/content4.html");
      break;
    case "Giáo Viên":
      loadContent("./blue/content5.html");
      break;
    case "Tài Chính":
      loadContent("./blue/content6.html");
      break;
    default:
      contentDiv.innerHTML = "<p>Chọn một thẻ để xem nội dung.</p>";
  }
}

document.querySelectorAll(".tag-content button").forEach((tag) => {
  tag.addEventListener("click", handleTagClick);
});

// Set default selection to the first tag
const firstTag = document.querySelector(".tag-content button");
if (firstTag) {
  handleTagClick({ target: firstTag });
}

const tagContent = document.querySelector(".tag-content");
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");

scrollLeftButton.addEventListener("click", () => {
  tagContent.scrollBy({ left: -1000, behavior: "smooth" }); // Adjust scroll amount as needed
});

scrollRightButton.addEventListener("click", () => {
  tagContent.scrollBy({ left: 1000, behavior: "smooth" }); // Adjust scroll amount as needed
});

function updateScrollButtons() {
  // Check if the content is fully visible
  const isFullyVisible = tagContent.scrollWidth <= tagContent.clientWidth;

  // If content is fully visible, hide both buttons
  if (isFullyVisible) {
    scrollLeftButton.style.display = "none";
    scrollRightButton.style.display = "none";
    return;
  }

  // Check if the content is scrolled to the left
  const isScrolledToLeft = tagContent.scrollLeft === 0;
  // Check if the content is scrolled to the right
  const isScrolledToRight =
    tagContent.scrollLeft + tagContent.clientWidth >=
    tagContent.scrollWidth - 50;

  // Show/hide buttons based on scroll position
  scrollLeftButton.style.display = isScrolledToLeft ? "none" : "block"; // Hide left button if scrolled to the left
  scrollRightButton.style.display = isScrolledToRight ? "none" : "block"; // Hide right button if scrolled to the right
}

// Update scroll buttons visibility on scroll
tagContent.addEventListener("scroll", updateScrollButtons);

// Update scroll buttons visibility on window resize
window.addEventListener("resize", updateScrollButtons);

// Initial check to set button visibility
updateScrollButtons();
