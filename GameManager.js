import * as OM from "/ObjectManager.js"
import * as GM from "/GraphicsManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
//Main initial call and setup
function main(){
	GM.mainInit();
	render();
}

//Recursive render function that animates the sphere and draws the line and sphere
function render() {
	setTimeout(function() {
		GM.renderInit();    //Initialize render function with the renderInit helper
		OM.drawSphere(0,0,0);

		//Draw triangles or line strips for the sphere depending on if shaded or not
		for (let i = 0; i < OM.getIndex(); i += 3) {
			GM.getGl().drawArrays(GM.getGl().TRIANGLES, i, 3);      //Shaded
		}
	}, 100)

	//Run the function again recursively
	//window.requestAnimationFrame(render());
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
main();