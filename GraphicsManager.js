let lightPosition = vec4(-4.0, 4.0, -10.0, 0.0 );       //Light position vector
let lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );           //Light ambient vector
let lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );          //Light diffuse vector
let lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );         //Light specular vector

export function getLightPosition(){ return lightPosition; }
export function getLightAmbient() { return lightAmbient;  }
export function getLightDiffuse() { return lightDiffuse;  }
export function getLightSpecular(){ return lightSpecular; }

export function getDiffuseProduct(materialDiffuse)  { return mult(getLightDiffuse(), materialDiffuse);   }
export function getSpecularProduct(materialSpecular){ return mult(getLightSpecular(), materialSpecular); }
export function getAmbientProduct(materialAmbient)  { return mult(getLightAmbient(), materialAmbient);   }

