import * as OM from "/ObjectManager.js"
import * as GM from "/GraphicsManager.js"
import * as MM from "/MaterialManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Variables
let subdivisions = 4;                                   //Sphere starting subdivisions

let program;                                            //Program global variable
let canvas;                                             //Canvas global variable
let gl;                                                 //GL global variable

let pointsArray = [];                                   //Triangle points array
let normalsArray = [];                                  //Triangle normals array
let index = 0;                                          //Triangle index

let va = vec4(0.0, 0.0, -1.0,1);                        //Sphere tetrahedron va value
let vb = vec4(0.0, 0.942809, 0.333333, 1);              //Sphere tetrahedron vb value
let vc = vec4(-0.816497, -0.471405, 0.333333, 1);       //Sphere tetrahedron vc value
let vd = vec4(0.816497, -0.471405, 0.333333,1);         //Sphere tetrahedron vd value

let modelViewMatrix, projectionMatrix;                  //ModelView and projection matrix global variable
let modelViewMatrixLoc, projectionMatrixLoc;            //ModelView and projection gpu location matrix global variable
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

	//Reset the sphere points array points and normals then create new ones with the tetrahedron function
	pointsArray = [];
	normalsArray = [];
	tetrahedron(va, vb, vc, vd, subdivisions);

	//Create a perspective projection and send it as projectionMatrix to the vertex shader
	let fovy = 12.5;
	projectionMatrix = perspective(fovy, 1, -100, 100);
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

	//Setup the camera matrix with the look at function and send it to the vertex shader as cameraMatrix
	let cameraMatrix = lookAt(GM.getEye(), GM.getAt(), GM.getUp());
	let cameraMatrixLoc = gl.getUniformLocation( program, "cameraMatrix" );
	gl.uniformMatrix4fv(cameraMatrixLoc, false, flatten(cameraMatrix));

	//Send modelViewMatrix to the vertex shader
	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
//Create triangles for the sphere
function triangle(a, b, c) {
	pointsArray.push(a);
	pointsArray.push(b);
	pointsArray.push(c);
	normalsArray.push(a[0],a[1], a[2], 0.0);
	normalsArray.push(b[0],b[1], b[2], 0.0);
	normalsArray.push(c[0],c[1], c[2], 0.0);
	index += 3;
}

//Subdivide sphere triangles for the tetrahedron function
function divideTriangle(a, b, c, count) {
	if ( count > 0 ) {
		let ab = mix( a, b, 0.5);
		let ac = mix( a, c, 0.5);
		let bc = mix( b, c, 0.5);

		//Calculate ab, ac, bc points
		ab = normalize(ab, true);
		ac = normalize(ac, true);
		bc = normalize(bc, true);

		//Recursively call function with the points
		divideTriangle( a, ab, ac, count - 1 );
		divideTriangle( ab, b, bc, count - 1 );
		divideTriangle( bc, c, ac, count - 1 );
		divideTriangle( ab, bc, ac, count - 1 );
	}
	//When all the points are created call the triangle helper function
	else {
		triangle( a, b, c );
	}
}

//Tetrahedron sphere generation
function tetrahedron(a, b, c, d, n) {
	divideTriangle(a, b, c, n);
	divideTriangle(d, c, b, n);
	divideTriangle(a, d, b, n);
	divideTriangle(a, c, d, n);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions

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
		OM.drawSphere(gl, program);

		//Update the modelViewMatrix with a new transform for the sphere
		modelViewMatrix = translate(0, 0, 0);
		gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

		//Draw triangles or line strips for the sphere depending on if shaded or not
		for (let i = 0; i < index; i += 3) {
			gl.drawArrays(gl.TRIANGLES, i, 3);      //Shaded
		}
	}, 100)

	//Run the function again recursively
	//window.requestAnimationFrame(render());
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Main Functions
main();