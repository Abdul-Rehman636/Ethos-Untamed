const mobileMenuButton = document.querySelector(".mobile-menu-button");
const navUl = document.querySelector(".nav-ul");

mobileMenuButton.addEventListener("click", () => {
  navUl.classList.toggle("open");
});

const slides = document.querySelector(".slides2");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slideElements = document.querySelectorAll(".slide2");
const paginationButtons = document.querySelectorAll(".pagination-button");
let currentIndex = 0;

var mediaQuery = window.matchMedia("(min-width: 1024px)");

function updateSlider() {
  if (mediaQuery.matches) {
    slides.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  } else {
    slides.style.transform = `translateX(-${currentIndex * 105}%)`;
  }

  paginationButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentIndex);
  });
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = mediaQuery.matches
      ? slideElements.length - 3
      : slideElements.length - 1;
  }
  updateSlider();
});

nextButton.addEventListener("click", () => {
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  const slidesToShow = mediaQuery.matches ? 3 : 1;
  const maxIndex = slideElements.length - slidesToShow;

  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  updateSlider();
});

paginationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentIndex = parseInt(button.getAttribute("data-index"));
    updateSlider();
  });
});
