export default class Slide {
	constructor(slide, container) {
		this.slide = document.getElementById(slide);
		this.container = document.getElementById(container);
		this.dist = {
			finalPosition: 0,
			startX: 0,
			movement: 0
		};
	}

	moveSlide(distX) {
		this.dist.movePosition = distX;
		this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
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
		this.moveSlide(finalPosition);
	}

	onEnd(event) {
		const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
		this.container.removeEventListener(moveType, this.onMove);
		this.dist.finalPosition = this.dist.movePosition;
	}

	addSlideEvents() {
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

	init() {
		this.bindEvents();
		this.addSlideEvents();
		return;
	}
}