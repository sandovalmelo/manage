import SlidesNav from "./slides.js";
const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");

menuOpen.addEventListener("click", () => {
	menu.setAttribute("data-open", "true");
});

menuClose.addEventListener("click", () => {
	menu.setAttribute("data-open", "false");
});

const slides = new SlidesNav("slides", "testimonials-container");
slides.init();
slides.addControl(".slides-control");
