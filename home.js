const mobileMenuButton = document.querySelector(".mobile-menu-button");
const navUl = document.querySelector(".nav-ul");
const miniSlides = document.querySelectorAll(".mini-slide");

mobileMenuButton.addEventListener("click", () => {
  navUl.classList.toggle("open");
});

const teaserPlayButton = document.querySelector(".teaser-play");
const teaserVideo = document.getElementById("teaser-video");

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

teaserPlayButton.addEventListener("click", () => {
  teaserVideo.style.display = "block";
  teaserVideo.play();
  enterFullscreen(teaserVideo);
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    teaserVideo.pause();
    teaserVideo.style.display = "none";
  }
});

const slides = document.querySelector(".slides");
const miniSlidesContainer = document.querySelector(".mini-slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const miniPrevButton = document.querySelector(".mini-prev");
const miniNextButton = document.querySelector(".mini-next");
const slideElements = document.querySelectorAll(".slide");
const paginationButtons = document.querySelectorAll(".pagination-button");
const dataContents = document.querySelectorAll(".data-content");
let currentIndex = 0;
let miniCurrentIndex = 0;
const miniSlidesToShow = 3;
const totalMiniSlides = miniSlides.length;

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  paginationButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentIndex);
  });
  dataContents.forEach((content) => {
    content.classList.remove("active");
  });
  const currentSlide = slideElements[currentIndex];
  const slideId = currentSlide.getAttribute("data-slide");
  const currentDataContent = document.querySelector(
    `.data-content[data-slide="${slideId}"]`
  );
  if (currentDataContent) {
    currentDataContent.classList.add("active");
  }
  updateMiniSlider();
}

function updateMiniSlider() {
  const translateValue = -(miniCurrentIndex * (82 + 32)) + "px";
  miniSlidesContainer.style.transform = `translateX(${translateValue})`;
}

miniSlides.forEach((miniSlide) => {
  miniSlide.addEventListener("click", () => {
    currentIndex = parseInt(miniSlide.getAttribute("data-slide")) - 1;
    updateSlider();
    updateMiniSlider();
  });
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slideElements.length - 1;
  }
  updateSlider();
});

nextButton.addEventListener("click", () => {
  if (currentIndex < slideElements.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
});

miniPrevButton.addEventListener("click", () => {
  if (miniCurrentIndex > 0) {
    miniCurrentIndex = Math.max(0, miniCurrentIndex - miniSlidesToShow);
  }
  updateMiniSlider();
});

miniNextButton.addEventListener("click", () => {
  if (miniCurrentIndex < totalMiniSlides - miniSlidesToShow) {
    miniCurrentIndex = Math.min(
      totalMiniSlides - miniSlidesToShow,
      miniCurrentIndex + miniSlidesToShow
    );
  }
  updateMiniSlider();
});

paginationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentIndex = parseInt(button.getAttribute("data-index"));
    updateSlider();
  });
});

updateSlider();
updateMiniSlider();

const secondSlides = document.querySelector(".slides2");
const secondprevButton = document.querySelector(".prev2");
const secondnextButton = document.querySelector(".next2");
const secondslideElements = document.querySelectorAll(".slide2");
const secondpaginationButtons = document.querySelectorAll(".pagination-button");
let secondcurrentIndex = 0;

var mediaQuery = window.matchMedia("(min-width: 1024px)");

function secondupdateSlider() {
  if (mediaQuery.matches) {
    secondSlides.style.transform = `translateX(-${
      secondcurrentIndex * 33.33
    }%)`;
  } else {
    secondSlides.style.transform = `translateX(-${secondcurrentIndex * 105}%)`;
  }

  secondpaginationButtons.forEach((button, index) => {
    button.classList.toggle("active", index === secondcurrentIndex);
  });
}

secondprevButton.addEventListener("click", () => {
  if (secondcurrentIndex > 0) {
    secondcurrentIndex--;
  } else {
    secondcurrentIndex = mediaQuery.matches
      ? secondslideElements.length - 3
      : secondslideElements.length - 1;
  }
  secondupdateSlider();
});

secondnextButton.addEventListener("click", () => {
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  const slidesToShow = mediaQuery.matches ? 3 : 1;
  const maxIndex = secondslideElements.length - slidesToShow;

  if (secondcurrentIndex < maxIndex) {
    secondcurrentIndex++;
  } else {
    secondcurrentIndex = 0;
  }

  secondupdateSlider();
});

secondpaginationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    secondcurrentIndex = parseInt(button.getAttribute("data-index"));
    secondupdateSlider();
  });
});
