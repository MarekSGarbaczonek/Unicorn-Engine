import * as OM from "/ObjectManager.js"
import * as GM from "/GraphicsManager.js"
import * as MM from "/MaterialManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Variables
let program;                                            //Program global variable
let canvas;                                             //Canvas global variable
let gl;                                                 //GL global variable

let projectionMatrix;               //ModelView and projection matrix global variable
let projectionMatrixLoc;            //ModelView and projection gpu location matrix global variable
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Variables
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Render Helper Functions
//Map value which spans from x1 - y1 and remap the range to x2 - y2
function map(value, x1, y1, x2, y2){
	return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
//Initialize the render function
function renderInit(){
	//Initialize the vertex and fragment shaders
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	//Set up the viewport
	gl.viewport( 0, 0, canvas.width, canvas.height);

	//Create a perspective projection and send it as projectionMatrix to the vertex shader
	let fovy = 12.5;
	projectionMatrix = perspective(fovy, 1, -100, 100);
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

	//Setup the camera matrix with the look at function and send it to the vertex shader as cameraMatrix
	let cameraMatrix = lookAt(GM.getEye(), GM.getAt(), GM.getUp());
	let cameraMatrixLoc = gl.getUniformLocation( program, "cameraMatrix" );
	gl.uniformMatrix4fv(cameraMatrixLoc, false, flatten(cameraMatrix));

	//Send shaded light variables to the shader
	gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(GM.getLightPosition()));
	gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(GM.getDiffuseProduct(MM.getMaterialDiffuse())));
	gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(GM.getSpecularProduct(MM.getMaterialSpecular())));
	gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(GM.getAmbientProduct(MM.getMaterialAmbient())));
	gl.uniform1f(gl.getUniformLocation(program, "shininess"), MM.getMaterialShininess());

	//Create a black background color
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Render Helper Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
//Main initial call and setup
function main(){
	// Get the rendering context for WebGL
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL(canvas);
	if ( !gl ) { alert( "WebGL isn't available" ); }

	//Enable the depth test
	gl.enable(gl.DEPTH_TEST);

	//Start recursive render function
	render();
}

//Recursive render function that animates the sphere and draws the line and sphere
function render() {
	setTimeout(function() {
		renderInit();    //Initialize render function with the renderInit helper
		OM.drawSphere(gl, program, 0,0,0);

		//Draw triangles or line strips for the sphere depending on if shaded or not
		for (let i = 0; i < OM.getIndex(); i += 3) {
			gl.drawArrays(gl.TRIANGLES, i, 3);      //Shaded
		}
	}, 100)

	//Run the function again recursively
	//window.requestAnimationFrame(render());
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
main();