import SlidesNav from "./slides.js";

// menu
const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");

menuOpen.addEventListener("click", () => {
	menu.setAttribute("data-open", "true");
});

menuClose.addEventListener("click", () => {
	menu.setAttribute("data-open", "false");
});

// slides
const slides = new SlidesNav("slides", "testimonials-container");
slides.init();
slides.addControl(".slides-control");

// form
const form = document.getElementById("form");
const email = document.getElementById("email");

function validateEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}

	return false;
}

form.addEventListener("submit", (event) => {
	event.preventDefault();

	if (email.value) {
		const isEmailValid = validateEmail(email.value);

		if (!isEmailValid) {
			form.classList.add("invalid-email");
		}
	}

	setTimeout(() => {
		form.classList.remove("invalid-email");
		email.value = "";
	}, 3000);
});
