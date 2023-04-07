import * as GM from "./GraphicsManager.js"
import * as MM from "./MaterialManager.js"
import {getMaterialShininess} from "/MaterialManager.js";

let lightPosition = vec4(-4.0, 4.0, -10.0, 0.0 );       //Light position vector
let lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );           //Light ambient vector
let lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );          //Light diffuse vector
let lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );         //Light specular vector

export function getLightPosition(){
    return lightPosition;
}

export function getLightAmbient(){
    return lightAmbient;
}
export function getLightDiffuse(){
    return lightDiffuse;
}

export function getLightSpecular(){
    return lightSpecular;
}

export function getDiffuseProduct(materialDiffuse){
    return mult(getLightDiffuse(), materialDiffuse);
}

export function getSpecularProduct(materialSpecular){
    return mult(getLightSpecular(), materialSpecular);
}

export function getAmbientProduct(materialAmbient){
    return mult(getLightAmbient(), materialAmbient);
}

let program;                                            //Program global variable
let canvas;                                             //Canvas global variable
let gl;                                                 //GL global variable

export function getProgram(){
    return program;
}

export function getCanvas(){
    return canvas;
}

export function getGl(){
    return gl;
}

export function setProgram(newProgram){
    program = newProgram;
    return program;
}

export function setCanvas(newCanvas){
    canvas = newCanvas;
    return canvas;
}

export function setGl(newGl){
    gl = newGl;
    return gl;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Variables
let projectionMatrix;               //ModelView and projection matrix global variable
let projectionMatrixLoc;            //ModelView and projection gpu location matrix global variable
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Variables

export function mainInit(){
    // Get the rendering context for WebGL
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL(canvas);
    if ( !gl ) { alert( "WebGL isn't available" ); }
}

//Initialize the render function
export function renderInit(){
    //Initialize the vertex and fragment shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    //Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    // Set depth function to LESS_EQUAL
    gl.depthFunc(gl.LEQUAL);

    //Set up the viewport
    gl.viewport( 0, 0, canvas.width, canvas.height);

    //Create a perspective projection and send it as projectionMatrix to the vertex shader
    let fovy = 12.5;
    projectionMatrix = perspective(fovy, 1, -0.001, 100);
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    renderUpdate();

    //Send shaded light variables to the shader
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(getDiffuseProduct(MM.getMaterialDiffuse())));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(getSpecularProduct(MM.getMaterialSpecular())));
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(getAmbientProduct(MM.getMaterialAmbient())));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), MM.getMaterialShininess());

    //Create a black background color
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
}




let cameraPosition = vec3(0.0, 0.0, 110.0);
let cameraTarget = vec3(0.0, 0.0, 0.0);
let cameraUp = vec3(0.0, 1.0, 0.0);

/*window.addEventListener('load', function() {
//When mouse drags left rotate that much to the left and if mouse drags right then rotate camera that much right
//The camera position should remain constant until mouse drags then it could live update
//The camera should keep cameraTarget be the same at vec3(0.0, 0.0, 0.0)
    let prevMouseX;
    canvas.addEventListener('mousemove', (event) => {
        if (prevMouseX !== undefined) {
            console.log("Here");
            const mouseDeltaX = event.clientX - prevMouseX;
            const rotateAngle = mouseDeltaX * 0.01; // adjust this value to change the sensitivity of the rotation
            const cameraRotationMatrix = rotateY(rotateAngle); // create a rotation matrix around the y-axis
            cameraPosition = mult(cameraRotationMatrix, cameraPosition); // apply the rotation to the camera position
            renderUpdate(); // update the camera matrix in the shader
        }
        prevMouseX = event.clientX;
    });
});*/

export function renderUpdate(){
    const cameraMatrix = lookAt(cameraPosition, cameraTarget, cameraUp);
    const cameraMatrixLoc = gl.getUniformLocation(program, 'cameraMatrix');
    gl.uniformMatrix4fv(cameraMatrixLoc, false, flatten(cameraMatrix));
}