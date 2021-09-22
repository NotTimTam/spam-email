"use strict";

let mouse = {
	x: 0,
	y: 0,
};
let dots = [];

let canvas;
let ctx;

const updateMouse = (e) => {
	mouse.x = e.clientX * window.devicePixelRatio;
	mouse.y = e.clientY * window.devicePixelRatio;
};

window.addEventListener("mousemove", updateMouse);
window.addEventListener("resize", () => {
	canvas.width = canvas.clientWidth * window.devicePixelRatio;
	canvas.height = canvas.clientHeight * window.devicePixelRatio;
	dots = [];

	propogateDots(canvas);
});

const addDot = (dot) => {
	dots.push(dot);
};
const angle = (object1, object2) => {
	return deg(Math.atan2(object1.y - object2.y, object1.x - object2.x));
};
const distance = (x1, y1, x2, y2) => {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};
const deg = (radian) => {
	return radian * (180 / Math.PI);
};
const rad = (degree) => {
	return degree * (Math.PI / 180);
};
const vector = (angle, velocity) => {
	return {
		x: velocity * Math.cos(rad(angle)),
		y: velocity * Math.sin(rad(angle)),
	};
};
const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
const propogateDots = (canvas) => {
	const size = 64;
	const dotXs = Math.round(canvas.width / size);
	const dotYs = Math.round(canvas.height / size);

	let dotSize = 14;

	for (let x = 0; x < dotXs; x++) {
		for (let y = 0; y < dotYs; y++) {
			const dot = {
				x: x * size + size / 2 + 32,
				y: y * size + size / 2 + 16,
				initX: x * size + size / 2,
				initY: y * size + size / 2,
				size: dotSize,
			};

			addDot(dot);
		}
	}
};
const renderDots = (canvas) => {
	for (let dot of dots) {
		ctx.beginPath();

		ctx.fillStyle = `rgba(${dot.lightness}, 50, 50, 0.5)`;
		ctx.beginPath();
		ctx.ellipse(
			dot.x + dot.size / 2,
			dot.y + dot.size / 2,
			dot.size,
			dot.size,
			0,
			0,
			Math.PI * 2,
			false
		);
		ctx.fill();

		ctx.closePath();

		// Update dot.
		let moveTowardOrigin = vector(
			angle({ x: dot.initX, y: dot.initY }, dot),
			distance(dot.x, dot.y, dot.initX, dot.initY) / 12
		);

		if (
			distance(dot.x, dot.y, moveTowardOrigin.x, moveTowardOrigin.y) >
			dot.size * 2
		) {
			dot.x += moveTowardOrigin.x;
			dot.y += moveTowardOrigin.y;
		}

		// let newPos = vector(
		// 	angle({ x: dot.initX, y: dot.initY }, mouse),
		// 	distance(dot.x, dot.y, mouse.x, mouse.y) / 12
		// );

		if (distance(dot.x, dot.y, mouse.x, mouse.y) < 256) {
			let newPos = vector(
				angle({ x: dot.initX, y: dot.initY }, mouse),
				distance(dot.initX, dot.initY, mouse.x, mouse.y) / 18
			);

			if (distance(dot.x, dot.y, newPos.x, newPos.y) > dot.size * 2) {
				dot.x += newPos.x;
				dot.y += newPos.y;
			}

			if (distance(dot.x, dot.y, dot.initX, dot.initY) < 255) {
				dot.lightness =
					(distance(dot.x, dot.y, dot.initX, dot.initY) / 256) *
					256 *
					2;
			}
		} else {
			dot.lightness = 50;
		}
	}
};

export const setup = (_canvas) => {
	canvas = _canvas;

	canvas.width = canvas.clientWidth * window.devicePixelRatio;
	canvas.height = canvas.clientHeight * window.devicePixelRatio;

	ctx = canvas.getContext("2d");

	propogateDots(canvas);
};

export const render = () => {
	clearCanvas();

	renderDots(canvas);

	requestAnimationFrame(render);
};
