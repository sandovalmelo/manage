import Slide from "./slide.js";
const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");

menuOpen.addEventListener("click", () => {
	menu.setAttribute("data-open", "true");
});

menuClose.addEventListener("click", () => {
	menu.setAttribute("data-open", "false");
});

const slide = new Slide("slides", "testimonials-container");
slide.init();
console.log(slide);
