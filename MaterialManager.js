let materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );       //Material ambient vector
let materialDiffuse = vec4( 0.5, 0.7, 1.0, 1.0 );       //Material diffuse vector
let materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );      //Material specular vector
let materialShininess = 100000;                           //Material shininess value

export function getMaterialAmbient(){
    return materialAmbient;
}

export function getMaterialDiffuse(){
    return materialDiffuse;
}

export function getMaterialSpecular(){
    return materialSpecular;
}

export function getMaterialShininess(){
    return materialShininess;
}