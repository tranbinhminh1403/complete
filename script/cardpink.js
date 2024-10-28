function handleTagClick(event) {
    const selectedTag = event.target.innerText;
    const contentDiv = document.querySelector('.content-pink');

    document.querySelectorAll('.tag-content-pink button').forEach(tag => {
        tag.style.borderBottom = 'none'; 
        tag.classList.add('unselected'); 
    });

    event.target.style.borderBottom = '2px solid rgb(253, 113, 175)'; 
    event.target.classList.remove('unselected'); 

    function loadContent(path) {
        fetch(path)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        });
    }

    // Update content based on the selected tag
    switch (selectedTag) {
        case 'Báo Cáo Thông Minh':
            loadContent('./pink/content1.html');
            break;
        case 'Tự Động Tính Phí':
            loadContent('./pink/content2.html');
            break;
        case 'Thiết Lập Đơn Giản':
            loadContent('./pink/content3.html');
            break;
        default:
            contentDiv.innerHTML = '<p>Chọn một thẻ để xem nội dung.</p>';
    }
}

document.querySelectorAll('.tag-content-pink button').forEach(tag => {
    tag.addEventListener('click', handleTagClick);
});

// Set default selection to the first tag
const firstTagPink = document.querySelector('.tag-content-pink button');
if (firstTagPink) {
    handleTagClick({ target: firstTagPink });
}

const tagContentPink = document.querySelector(".tag-content-pink");
const scrollLeftButtonPink = document.querySelector(".scroll-left-pink");
const scrollRightButtonPink = document.querySelector(".scroll-right-pink");

scrollLeftButtonPink.addEventListener("click", () => {
    tagContentPink.scrollBy({ left: -300, behavior: "smooth" }); // Adjust scroll amount as needed
});

scrollRightButtonPink.addEventListener("click", () => {
    tagContentPink.scrollBy({ left: 300, behavior: "smooth" }); // Adjust scroll amount as needed
});

function updateScrollButtonsPink() {
    // Check if the content is fully visible
    const isFullyVisiblePink = tagContentPink.scrollWidth <= tagContentPink.clientWidth;

    // If content is fully visible, hide both buttons
    if (isFullyVisiblePink) {
        scrollLeftButtonPink.style.display = "none";
        scrollRightButtonPink.style.display = "none";
        return;
    }

    // Check if the content is scrolled to the left
    const isScrolledToLeftPink = tagContentPink.scrollLeft === 0;
    // Check if the content is scrolled to the right
    const isScrolledToRightPink =
        tagContentPink.scrollLeft + tagContentPink.clientWidth >=
        tagContentPink.scrollWidth - 50;

    // Show/hide buttons based on scroll position
    scrollLeftButtonPink.style.display = isScrolledToLeftPink ? "none" : "block"; // Hide left button if scrolled to the left
    scrollRightButtonPink.style.display = isScrolledToRightPink ? "none" : "block"; // Hide right button if scrolled to the right
}

// Update scroll buttons visibility on scroll
tagContentPink.addEventListener("scroll", updateScrollButtonsPink);

// Update scroll buttons visibility on window resize
window.addEventListener("resize", updateScrollButtonsPink);

// Initial check to set button visibility
updateScrollButtonsPink();
