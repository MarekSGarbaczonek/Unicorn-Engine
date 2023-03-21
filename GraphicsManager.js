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

let eye = vec3(0.0, 0.0, 110.0);                        //Camera eye vector
let at = vec3(0.0, 0.0, 0.0);                           //Camera at vector
let up = vec3(0.0, 1.0, 0.0);                           //Camera up vector

export function getEye(){
    return eye;
}
export function getAt(){
    return at;
}
export function getUp(){
    return up;
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