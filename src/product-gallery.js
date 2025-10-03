// Swiper core
import Swiper from "swiper";
import { Thumbs, Navigation } from "swiper/modules";

// CSS
import "swiper/css";

document.addEventListener("DOMContentLoaded", () => {
  const mainEl = document.querySelector(".product-main");
  const thumbsEl = document.querySelector(".product-thumbs");

  if (!mainEl || !thumbsEl) return;

  const thumbs = new Swiper(thumbsEl, {
    modules: [Thumbs],
    direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      640: { slidesPerView: 6 },
    },
  });

  new Swiper(mainEl, {
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: { swiper: thumbs },
  });
});
