let gl;
let program;

let points;
let colors;
let theta = 0;
let alpha = 0;
let id;

// Main
function main() {
	// Canvas
	let canvas = document.getElementById('webgl');
	gl = WebGLUtils.setupWebGL(canvas, undefined);
	if (!gl) { console.log('Failed to get the rendering context for WebGL'); return; }

	// Init shaders and setup viewport
	program = initShaders(gl, "vshader", "fshader");
	gl.useProgram(program);
	gl.viewport( 0, 0, canvas.width, canvas.height );
	
	// Create shape
	points = [];
	colors = [];
	quad( 1, 0, 3, 2 );
	quad( 2, 3, 7, 6 );
	quad( 3, 0, 4, 7 );
	quad( 6, 5, 1, 2 );
	quad( 4, 5, 6, 7 );
	quad( 5, 4, 0, 1 );

	// Create the buffer object
	let vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	// Get the location of the shader's vPosition attribute in the GPU's memory and specify how shader should pull data
	let vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	// Specify the vertex size
	let offsetLoc = gl.getUniformLocation(program, "vPointSize");
	gl.uniform1f(offsetLoc, 10.0);

	let cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

	let vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	// Perspective
	let thisProj = ortho(-1, 1, -1, 1, 0.1, 100);
	let projMatrix = gl.getUniformLocation(program, 'projMatrix');
	gl.uniformMatrix4fv(projMatrix, false, flatten(thisProj));

	// Setup
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	render();
}

// Render
function render() {
	let rotMatrix = rotate(-45, vec3(1.0, 1.0, 1.0));
	let translateMatrix = translate(0, 0, 0);
	let ctMatrix = mult(translateMatrix, rotMatrix);

	let eye = vec3(2.0, 2.0, 2.0);
	let at = vec3(0.0, alpha, 0.0);
	let up = vec3(0.0, 1.0, 0.0);

	let cameraMatrix = lookAt(eye, at, up);
	let ctMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
	gl.uniformMatrix4fv(ctMatrixLoc, false, flatten(ctMatrix));
	let cameraMatrixLoc = gl.getUniformLocation(program, "cameraMatrix");
	gl.uniformMatrix4fv(cameraMatrixLoc, false, flatten(cameraMatrix));

	gl.clear( gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length);
	id = requestAnimationFrame(render);
}

// Create a cube
function quad(a, b, c, d) {
    let vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    let vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    let indices = [ a, b, c, a, c, d ];

    for (let i = 0; i < indices.length; ++i) {
        points.push( vertices[indices[i]] );
        colors.push(vertexColors[a]);
    }
}