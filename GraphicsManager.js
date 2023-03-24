import * as GM from "/GraphicsManager.js"
import * as MM from "/MaterialManager.js"
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

    //Enable the depth test
    gl.enable(gl.DEPTH_TEST);
}

let zoomFactor = 1; // Initial zoom factor

//Initialize the render function
export function renderInit(){
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

    let eye = vec3(0.0, 0.0, 110.0*1/zoomFactor);
    let at = vec3(0.0, 0.0, 0.0);//.add(rotatedAt);            //Camera at vector
    let up = vec3(0.0, 1.0, 0.0);                           //Camera up vector

    //Setup the camera matrix with the look at function and send it to the vertex shader as cameraMatrix
    let cameraMatrix = lookAt(eye, at, up);
    let cameraMatrixLoc = gl.getUniformLocation( program, "cameraMatrix" );
    gl.uniformMatrix4fv(cameraMatrixLoc, false, flatten(cameraMatrix));

    //Send shaded light variables to the shader
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(getDiffuseProduct(MM.getMaterialDiffuse())));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(getSpecularProduct(MM.getMaterialSpecular())));
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(getAmbientProduct(MM.getMaterialAmbient())));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), MM.getMaterialShininess());

    //Create a black background color
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
}