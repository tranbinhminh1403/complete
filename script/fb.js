const testimonials = [
    {
        quote: "Ant Center đã thực sự làm thay đổi cách quản lý trung tâm đào tạo của chúng tôi. Với những tính năng toàn diện, chúng tôi có thể dễ dàng quản lý việc đăng ký học viên, lịch học và tài liệu đào tạo. Phần mềm này đã tối ưu hóa quy trình làm việc của chúng tôi và cải thiện hiệu suất làm việc tổng thể.",
        name: "Quỳnh Anh",
        title: "Founder & CEO - Amslink",
        avatar: "https://ant-center.com/assets/testimonial-avatar/amslink.jpg"
    },
    {
        quote: "Kể từ khi triển khai Ant Center, chúng tôi đã chứng kiến một sự thay đổi đáng kể trong hoạt động của MoyArt. Các tính năng mạnh mẽ của phần mềm này cho phép chúng tôi dễ dàng theo dõi tiến trình học tập của học viên, quản lý phân công giảng viên và tạo ra báo cáo chi tiết.",
        name: "Võ Mai Thương",
        title: "Founder & CEO - MoyArt",
        avatar: "https://ant-center.com/assets/testimonial-avatar/MoyArt.jpg"
    },
    {
        quote: "Chúng tôi rất hài lòng với phần mềm Ant Center. Giao diện thân thiện và các tính năng mạnh mẽ của nó đã đơn giản hóa các công việc quản lý của chúng tôi. ",
        name: "Tùng Đàm",
        title: "Founder & CEO - AtSchool",
        avatar: "https://ant-center.com/assets/testimonial-avatar/AtSchool.jpg"
    },
    {
        quote: "Chúng tôi đã tiết kiệm rất nhiều thời gian và công sức kể từ khi sử dụng Ant Center. Nhiều tính năng linh hoạt và dễ sử dụng giúp chúng tôi dễ dàng theo dõi học viên, quản lý lớp học và tạo lịch học một cách hiệu quả.",
        name: "Ngân JP",
        title: "Founder & CEO - BrainSTEM",
        avatar: "https://ant-center.com/assets/testimonial-avatar/BrainSTEM.jpg"
    },
    {
        quote: "Ant Center đã giúp chúng tôi tối ưu xếp lịch dạy và quản lý công việc một cách hiệu quả. Bảng công tự động và tính năng đánh giá kết quả giảng dạy toàn diện đã giúp chúng tôi tiết kiệm thời gian và nâng cao hiệu suất làm việc của giáo viên.",
        name: "Linh Đặng",
        title: "Founder & CEO - BZ English",
        avatar: "https://ant-center.com/assets/testimonial-avatar/BZEnglish.jpg"
    }
];

const quoteElement = document.querySelector('.quote');
const nameElement = document.querySelector('.testimony .name');
const titleElement = document.querySelector('.testimony .title');
const avatarScroll = document.querySelector('.avatar-scroll');

let currentIndex = 0;
let autoSlideInterval; // Declare the interval variable

function createAvatars() {
    testimonials.forEach((testimonial) => {
        const avatar = document.createElement('img');
        avatar.src = testimonial.avatar;
        avatar.classList.add('avatar');
        avatarScroll.appendChild(avatar);
    });
}

// Update the active avatar based on the current index
function updateActiveAvatar(index) {
    const avatars = avatarScroll.querySelectorAll('.avatar');
    const activeIndex = index % testimonials.length;

    // Rearrange avatars based on the active index
    const newOrder = [
        (activeIndex + 3) % testimonials.length,
        (activeIndex + 4) % testimonials.length,
        activeIndex,
        (activeIndex + 1) % testimonials.length,
        (activeIndex + 2) % testimonials.length
    ];

    // Clear current avatars
    avatarScroll.innerHTML = '';

    // Append avatars in the new order
    newOrder.forEach(i => {
        const avatar = document.createElement('img');
        avatar.src = testimonials[i].avatar;
        avatar.classList.add('avatar');
        avatarScroll.appendChild(avatar);
    });

    // Remove active class from all avatars
    avatars.forEach(avatar => avatar.classList.remove('active'));

    // Set the active class on the current avatar
    const newAvatars = avatarScroll.querySelectorAll('.avatar');
    newAvatars[2].classList.add('active'); // The active avatar is now in the middle

    // Calculate the offset for scrolling
    const offset = (2 - currentIndex) * 70; // Adjust based on avatar width and margin
    avatarScroll.style.transform = `translateX ${offset}px)`; // Scroll to the new position

    // Update the current index
    currentIndex = activeIndex;
}

// Update the testimonial and active avatar
function updateTestimonial(index) {
    const testimonial = testimonials[index % testimonials.length];
    quoteElement.textContent = testimonial.quote;
    nameElement.textContent = testimonial.name;
    titleElement.textContent = testimonial.title;

    // Update the active avatar
    updateActiveAvatar(index);
}

// Auto-switch to the next avatar every 3 seconds
function autoSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
}

// Function to start the auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3000); // Set the interval for auto sliding
}

// Initialize avatars and start the auto slide
createAvatars();
updateTestimonial(0);
startAutoSlide(); // Start the auto slide initially

// Click event to manually switch the active avatar and center it
avatarScroll.addEventListener('click', (e) => {
    if (e.target.classList.contains('avatar')) {
        const avatars = Array.from(avatarScroll.querySelectorAll('.avatar'));
        
        // Find the index of the clicked avatar in the current displayed order
        const clickedIndex = avatars.indexOf(e.target);
        
        // Update the current index to the clicked avatar's index
        currentIndex = (currentIndex + (clickedIndex - 2 + testimonials.length)) % testimonials.length; // Adjust for the new order
        
        // Rearrange avatars based on the clicked index
        const newOrder = [
            (currentIndex + 3) % testimonials.length,
            (currentIndex + 4) % testimonials.length,
            currentIndex, // The clicked avatar becomes the active one
            (currentIndex + 1) % testimonials.length,
            (currentIndex + 2) % testimonials.length
        ];

        // Clear current avatars
        avatarScroll.innerHTML = '';

        // Append avatars in the new order
        newOrder.forEach(i => {
            const avatar = document.createElement('img');
            avatar.src = testimonials[i].avatar;
            avatar.classList.add('avatar');
            avatarScroll.appendChild(avatar);
        });

        // Remove active class from all avatars
        avatars.forEach(avatar => avatar.classList.remove('active'));
        
        // Set the active class on the clicked avatar
        e.target.classList.add('active'); // Mark the clicked avatar as active

        // Update the testimonial based on the new current index
        updateTestimonial(currentIndex);

        // Reset the auto slide interval
        clearInterval(autoSlideInterval); // Clear the existing interval
        startAutoSlide(); // Start a new interval
    }
});

// Add event listeners for the next and previous buttons
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next'); // Directly select the next button by class

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; // Move to the previous index
    updateTestimonial(currentIndex); // Update the testimonial
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length; // Move to the next index
    updateTestimonial(currentIndex); // Update the testimonial
});
