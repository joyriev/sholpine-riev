import Alpine from "alpinejs";
import "./theme.css";
import "./product-gallery.js";
import "./cart.js";
import "./product.js";
import "./search.js";

window.Alpine = Alpine;
Alpine.start();

// Homepage trending product slider
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".home_trending_slider", {
    modules: [Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
