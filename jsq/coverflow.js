var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 2, // 從第2個 slide 開始顯示
  loop: true, // 讓輪播具備無限循環的功能
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: { // 啟用左右切換按鈕
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});