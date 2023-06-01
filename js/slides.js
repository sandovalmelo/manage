export default class Slides {
	constructor(slides, container) {
		this.slides = document.getElementById(slides);
		this.container = document.getElementById(container);
		this.dist = {
			finalPosition: 0,
			startX: 0,
			movement: 0
		};
	}

	moveSlides(distX) {
		this.dist.movePosition = distX;
		this.slides.style.transform = `translate3d(${distX}px, 0, 0)`;
	}

	updatePosition(clientX) {
		this.dist.movement = (this.dist.startX - clientX) * 1.6;
		return this.dist.finalPosition - this.dist.movement;
	}

	onStart(event) {
		let movetype;

		if (event.type === "mousedown") {
			event.preventDefault();
			this.dist.startX = event.clientX;
			movetype = "mousemove";
		} else {
			this.dist.startX = event.changedTouches[0].clientX;
			movetype = "touchmove";
		}

		this.container.addEventListener(movetype, this.onMove);
	}

	onMove(event) {
		const pointerPosition =
			event.type === "mousemove" ? event.clientX : event.changedTouches[0].clientX;
		const finalPosition = this.updatePosition(pointerPosition);
		this.moveSlides(finalPosition);
	}

	onEnd(event) {
		const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
		this.container.removeEventListener(moveType, this.onMove);
		this.dist.finalPosition = this.dist.movePosition;
	}

	addSlidesEvents() {
		this.container.addEventListener("mousedown", this.onStart);
		this.container.addEventListener("mouseup", this.onEnd);
		this.container.addEventListener("touchstart", this.onStart);
		this.container.addEventListener("touchend", this.onEnd);
	}

	bindEvents() {
		this.onStart = this.onStart.bind(this);
		this.onMove = this.onMove.bind(this);
		this.onEnd = this.onEnd.bind(this);
	}

	// Slidess config
	slidesConfig(slide) {
		const margin = (this.container.offsetWidth - slide.offsetWidth) / 2;
		return -(slide.offsetLeft - margin);
	}

	slidessConfig() {
		this.slidesArray = [...this.slides.children].map((element) => {
			const position = this.slidesConfig(element);
			return {
				element,
				position
			};
		});
	}

	slidesIndexNav(index) {
		const last = this.slidesArray.length - 1;
		this.index = {
			prev: index ? index - 1 : undefined,
			active: index,
			next: index === last ? undefined : index + 1
		};
	}

	changeSlide(index) {
		const activeSlide = this.slidesArray[index];
		this.moveSlides(activeSlide.position);
		this.slidesIndexNav(index);
		this.dist.finalPosition = activeSlide.position;
	}

	init() {
		this.bindEvents();
		this.addSlidesEvents();
		this.slidessConfig();
		return;
	}
}
