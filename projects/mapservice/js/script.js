document.querySelector(".wrap").oncontextmenu = () => {
	return false;
}
const MODAL = document.querySelector(".pop_up__background");
const MODALWIDOW = document.querySelector(".modal");
const FIELD = document.querySelector(".wrap__container");
const MODALDISABLE = "pop_up--disable";

const closeCreatForm = document.querySelector(".button__close");
const buttonCreatPoint = document.querySelector(".button__creat");

let namePoint = document.querySelector("#namePoint");
let textPoint = document.querySelector("#textPoint");
let colorPoint = document.querySelector("#colorPoint");
addCoockie("id", 0);

const map = {
	coordX: 8960.0,
	coordY: 8960.0
};
const maxcoord = 4480;

// open pop up edit && delete point
FIELD.addEventListener("mouseover", (e) => {
	if (e.target.classList.contains("point")) {
		e.target.addEventListener("click", () => {
			MODALWIDOW.classList.add("modal__point");
			buttonCreatPoint.style.display = "none";
			namePoint.value = getCookie("title");
			textPoint.value = e.target.textContent;
			colorPoint.value = getCookie("color");

			MODALWIDOW.querySelector(".buttons").innerHTML =
				`<button class="button__edit add__button">Изменить</button>
			<button class="button__dell add__button">Удалить точку</button>`;
			MODAL.classList.remove(MODALDISABLE);
		});
	}
});

// open pop up creat point
FIELD.addEventListener("contextmenu", (e) => {
	if (!e.target.classList.contains("point")) {
		let x = e.pageX - 339;
		let y = e.pageY - 61;
		let coords = creatCord(x, y);

		addCoockie("coordX", coords[0]);
		addCoockie("coordY", coords[1]);

		addCoockie("positX", x);
		addCoockie("positY", y);

		document.querySelector(".coord__number--x").textContent = coords[0];
		document.querySelector(".coord__number--y").textContent = coords[1];

		MODAL.classList.toggle(MODALDISABLE);
		if (MODALWIDOW.classList.contains("modal__point"))
			MODALWIDOW.classList.remove("modal__point");
	}
});

// close pop up && creat point
buttonCreatPoint.addEventListener("click", () => {
	addCoockie("title", namePoint.value);
	addCoockie("text", textPoint.value);
	addCoockie("color", colorPoint.value);
	addCoockie("id", (1 * getCookie("id")) + 1);

	creatPoint();
	MODAL.classList.toggle(MODALDISABLE);
	nullInputs();

	if (MODALWIDOW.classList.contains("modal__point"))
		MODALWIDOW.classList.remove("modal__point");
});

// close pop up
closeCreatForm.addEventListener("click", () => {
	MODAL.classList.toggle(MODALDISABLE);
	nullInputs();

	if (MODALWIDOW.classList.contains("modal__point")) {
		MODALWIDOW.classList.remove("modal__point");
		buttonCreatPoint.style.display = "inline-block";
	}
});

// close pop up
document.querySelector(".pop_up__background").addEventListener("click", (e) => {
	if (e.target.classList.contains("pop_up__background")) {
		MODAL.classList.add(MODALDISABLE);
		nullInputs();
		if (MODALWIDOW.classList.contains("modal__point")) {
			MODALWIDOW.classList.remove("modal__point");
			buttonCreatPoint.style.display = "inline-block";
		}
	}
});

// close pop up
document.body.addEventListener("keyup", function (e) {
	var key = e.keyCode;

	if (key == 27) {
		if(MODAL.classList.contains(MODALDISABLE) == false)
		{
			MODAL.classList.add(MODALDISABLE);
			nullInputs();
			if (MODALWIDOW.classList.contains("modal__point")) {
				MODALWIDOW.classList.remove("modal__point");
				buttonCreatPoint.style.display = "inline-block";
			}
		}
	};
}, false);

function creatPoint() {
	FIELD.insertAdjacentHTML(
		"afterbegin",
		`<div class="point" 
		id="id-${getCookie("id")}" 
		style="
		left: ${getCookie("positX")}px; 
		top: ${getCookie("positY")}px; 
		background-color: ${getCookie("color")};" 
		title="${getCookie("title")}" 
		 
		data-coord-x="${getCookie("coordX")}" 
		data-coord-y="${getCookie("coordY")}">
		${getCookie("text")}</div>`
	);
}

function editCoord(position) {
	if (position > maxcoord) {
		return (position - maxcoord);
	} else if (position < maxcoord) {
		return (maxcoord - position) * -1;
	} else if (position == maxcoord) {
		return 0;
	}
}

function creatCord(positionX, positionY) {
	let tempX = map.coordX * 1.00 - ((positionX * 8) * 2);
	tempX = (tempX - map.coordX) * -1;
	tempX = editCoord(tempX);
	tempX = tempX.toFixed(0);

	let tempY = map.coordY * 1.00 - ((positionY * 8) * 2);
	tempY = (tempY - map.coordY) * -1;
	tempY = editCoord(tempY);
	tempY = tempY.toFixed(0);

	return [tempX, tempY];
}

function addCoockie(name, value) {
	document.cookie = name + '=' + value;
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function nullInputs() {
	namePoint.value = "";
	textPoint.value = "";
	colorPoint.value = "#FFFB00";
}