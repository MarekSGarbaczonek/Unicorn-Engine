import * as OM from "./ObjectManager.js"
import * as GM from "./GraphicsManager.js"
import * as MM from "./MaterialManager.js";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
//Main initial call and setup
function main(){
	GM.mainInit();
	GM.renderInit();
	render();
}

let angleY = 0;
let angleX = 0;
let prevMouseX;
let prevMouseY;

document.addEventListener('mousemove', function(e) {
	if (prevMouseX != null) {
		let mouseX = e.clientX;
		let delta_x = mouseX - prevMouseX;
		angleY -= delta_x;
		prevMouseX = mouseX;
	}

	if (prevMouseY != null) {
		let mouseY = e.clientY;
		let delta_y = mouseY - prevMouseY;
		angleX -= delta_y;
		prevMouseY = mouseY;
	}
});

document.addEventListener('mousedown', function(e) {
	prevMouseX = e.clientX;
	prevMouseY = e.clientY;
});

document.addEventListener('mouseup', function(e) {
	prevMouseX = null;
	prevMouseY = null;
});


document.addEventListener('keydown', function(e) {
	if (e.key === 'r') {
		angleY = 0;
		angleX = 0;
	}
});

let isLines = false;
const linesTrianglesButton = document.getElementById('linesTrianglesButton');
linesTrianglesButton.addEventListener('click', linesTriangles);
function linesTriangles(){ isLines = !isLines; }

let subdivisions = 4;
function subdivide(){ subdivisions++; }
const subdivideButton = document.getElementById('subdivideButton');
subdivideButton.addEventListener('click', subdivide);

function decimate(){ subdivisions--; }
const decimateButton = document.getElementById('decimateButton');
decimateButton.addEventListener('click', decimate);


//Recursive render function that animates the sphere and draws the line and sphere
function render() {
	//Initialize render function with the renderInit helper
	//GM.renderInit();
	const pColorSlider = document.getElementById('primary-color-slider');
	const sColorSlider = document.getElementById('secondary-color-slider');

	let primaryColor = hexToRGB(pColorSlider.value);
	MM.setMaterialDiffuse(vec4( primaryColor.r, primaryColor.g, primaryColor.b, 1.0));

	//Draw
	OM.drawSphere(0,0,0, subdivisions, 8, angleY, angleX, isLines);

	// Run the function again recursively using requestAnimationFrame
	window.requestAnimationFrame(render);
}

function hexToRGB(hex) {
	// Remove the "#" character from the beginning of the hex string
	hex = hex.replace("#", "");

	// Parse the red, green, and blue values from the hex string
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;

	// Return the RGB color value as an object with r, g, and b properties
	return { r, g, b };
}

//Start the program by calling the main function
main();