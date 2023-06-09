import debounce from "./debounce.js";

export class Slides {
	constructor(slides, container) {
		this.slides = document.getElementById(slides);
		this.container = document.getElementById(container);
		this.dist = {
			finalPosition: 0,
			startX: 0,
			movement: 0
		};
		this.activeClass = "active";
		this.changeEvent = new Event("changeEvent");
	}

	transition(active) {
		this.slides.style.transition = active ? "transform .3s" : "";
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
		this.transition(false);
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
		this.transition(true);
		this.changeSlideOnEnd();
	}

	changeSlideOnEnd() {
		if (this.dist.movement > 120 && this.index.next !== undefined) {
			this.activNextSlide();
		} else if (this.dist.movement < 120 && this.index.prev !== undefined) {
			this.activPrevSlide();
		} else {
			this.changeSlide(this.index.active);
		}
	}

	addSlidesEvents() {
		this.container.addEventListener("mousedown", this.onStart);
		this.container.addEventListener("mouseup", this.onEnd);
		this.container.addEventListener("touchstart", this.onStart);
		this.container.addEventListener("touchend", this.onEnd);
	}

	// Slidess config
	slidesPosition(slide) {
		const margin = (this.container.offsetWidth - slide.offsetWidth) / 2;
		return -(slide.offsetLeft - margin);
	}

	slidesConfig() {
		this.slidesArray = [...this.slides.children].map((element) => {
			const position = this.slidesPosition(element);
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
		this.changeActiveSlide();
		this.container.dispatchEvent(this.changeEvent);
	}

	changeActiveSlide() {
		this.slidesArray.forEach((item) => item.element.classList.remove(this.activeClass));
		this.slidesArray[this.index.active].element.classList.add(this.activeClass);
	}

	activPrevSlide() {
		if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
	}

	activNextSlide() {
		if (this.index.next !== undefined) this.changeSlide(this.index.next);
	}

	onResize() {
		setTimeout(() => {
			this.slidesConfig();
			this.changeSlide(this.index.active);
		}, 1000);
	}

	addResizeEvent() {
		window.addEventListener("resize", this.onResize);
	}

	bindEvents() {
		this.onStart = this.onStart.bind(this);
		this.onMove = this.onMove.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onResize = debounce(this.onResize.bind(this), 200);
	}

	init() {
		this.bindEvents();
		this.transition(true);
		this.addSlidesEvents();
		this.slidesConfig();
		this.addResizeEvent();
		this.changeSlide(0);
		return;
	}
}

export default class SlidesNav extends Slides {
	constructor(slides, container) {
		super(slides, container);
		this.bindControlEvents();
	}

	eventControl(item, index) {
		item.addEventListener("click", (event) => {
			event.preventDefault();
			this.changeSlide(index);
		});
		this.container.addEventListener("changeEvent", this.activeControlItem);
	}

	activeControlItem() {
		this.controlArray.forEach((item) => item.classList.remove(this.activeClass));
		this.controlArray[this.index.active].classList.add(this.activeClass);
	}

	addControl(customControl) {
		this.control = document.querySelector(customControl);
		this.controlArray = [...this.control.children];
		this.activeControlItem();
		this.controlArray.forEach(this.eventControl);
	}

	bindControlEvents() {
		this.eventControl = this.eventControl.bind(this);
		this.activeControlItem = this.activeControlItem.bind(this);
	}
}
