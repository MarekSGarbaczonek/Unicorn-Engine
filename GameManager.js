import * as OM from "/ObjectManager.js"
import * as GM from "/GraphicsManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
//Main initial call and setup
function main(){
	GM.mainInit();
	render();
}

let angleY = 0;
let angleX = 0;
let prevMouseX;
let prevMouseY;

// Add event listeners to track mouse movement
document.addEventListener('mousedown', function(e) {
	prevMouseX = e.clientX;
	prevMouseY = e.clientY;
});

document.addEventListener('mouseup', function(e) {
	prevMouseX = null;
	prevMouseY = null;
});

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

document.addEventListener('keydown', function(e) {
	if (e.key === 'r') {
		angleY = 0;
		angleX = 0;
	}
});

//Recursive render function that animates the sphere and draws the line and sphere
function render() {
	setTimeout(function() {
		GM.renderInit();    //Initialize render function with the renderInit helper
		OM.drawSphere(0,0,0, 6, 4, angleY, angleX);
		GM.getGl().drawArrays(GM.getGl().POINTS, 0, OM.getIndex());

		//Draw triangles or line strips for the sphere depending on if shaded or not
		//for (let i = 0; i < OM.getIndex(); i += 3) {
        //    GM.getGl().drawArrays(GM.getGl().TRIANGLES, i, 3);      //Shaded
        //}
	}, 100)

	//Run the function again recursively
	window.requestAnimationFrame(render());
}

//Start the program by calling the main function
main();

