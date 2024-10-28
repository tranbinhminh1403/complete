function handleTagClick(event) {
  const selectedTag = event.target.innerText;
  const contentDiv = document.querySelector(".content-green");

  document.querySelectorAll(".tag-content-green button").forEach((tag) => {
    tag.style.borderBottom = "none";
    tag.classList.add("unselected");
  });

  event.target.style.borderBottom = "2px solid rgb(0, 184, 132)";
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
    case "Báo Cáo Học Tập":
      loadContent("./green/content1.html");
      break;
    case "Bài Tập & Kiểm Tra":
      loadContent("./green/content2.html");
      break;
    case "Chấm Bài & Trả Bài":
      loadContent("./green/content3.html");
      break;
    default:
      contentDiv.innerHTML = "<p>Chọn một thẻ để xem nội dung.</p>";
  }
}

document.querySelectorAll(".tag-content-green button").forEach((tag) => {
  tag.addEventListener("click", handleTagClick);
});

// Set default selection to the first tag
const firstTagGreen = document.querySelector(".tag-content-green button");
if (firstTagGreen) {
  handleTagClick({ target: firstTagGreen });
}

const tagContentGreen = document.querySelector(".tag-content-green");
const scrollLeftButtonGreen = document.querySelector(".scroll-left-green");
const scrollRightButtonGreen = document.querySelector(".scroll-right-green");

scrollLeftButtonGreen.addEventListener("click", () => {
  tagContentGreen.scrollBy({ left: -300, behavior: "smooth" }); // Adjust scroll amount as needed
});

scrollRightButtonGreen.addEventListener("click", () => {
  tagContentGreen.scrollBy({ left: 300, behavior: "smooth" }); // Adjust scroll amount as needed
});

function updateScrollButtonsGreen() {
  // Check if the content is fully visible
  const isFullyVisibleGreen = tagContentGreen.scrollWidth <= tagContentGreen.clientWidth;

  // If content is fully visible, hide both buttons
  if (isFullyVisibleGreen) {
    scrollLeftButtonGreen.style.display = "none";
    scrollRightButtonGreen.style.display = "none";
    return;
  }

  // Check if the content is scrolled to the left
  const isScrolledToLeftGreen = tagContentGreen.scrollLeft === 0;
  // Check if the content is scrolled to the right
  const isScrolledToRightGreen =
    tagContentGreen.scrollLeft + tagContentGreen.clientWidth >=
    tagContentGreen.scrollWidth - 50;

  // Show/hide buttons based on scroll position
  scrollLeftButtonGreen.style.display = isScrolledToLeftGreen ? "none" : "block"; // Hide left button if scrolled to the left
  scrollRightButtonGreen.style.display = isScrolledToRightGreen ? "none" : "block"; // Hide right button if scrolled to the right
}

// Update scroll buttons visibility on scroll
tagContentGreen.addEventListener("scroll", updateScrollButtonsGreen);

// Update scroll buttons visibility on window resize
window.addEventListener("resize", updateScrollButtonsGreen);

// Initial check to set button visibility
updateScrollButtonsGreen();
