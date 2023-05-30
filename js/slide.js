export default class Slide {
	constructor(slide, container) {
		this.slide = document.getElementById(slide);
		this.container = document.getElementById(container);
	}

	onStart(event) {
		event.preventDefault();
		console.log(event);
	}

	addSlideEvents() {
		this.container.addEventListener("mousedown", this.onStart);
	}

	init() {
		this.addSlideEvents();
		return;
	}
}
