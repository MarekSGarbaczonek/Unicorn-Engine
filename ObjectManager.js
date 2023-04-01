import * as GM from "./GraphicsManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
let pointsArray = [];                                        //Triangle points array
let normalsArray = [];                                       //Triangle normals array
let index = 0;                                          //Triangle index
let modelViewMatrix, modelViewMatrixLoc;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
/*
function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
    return a + t * (b - a);
}

function grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function perlin3(x, y, z, frequency) {
    const X = Math.floor(x * frequency) & 255;
    const Y = Math.floor(y * frequency) & 255;
    const Z = Math.floor(z * frequency) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = fade(x);
    const v = fade(y);
    const w = fade(z);

    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;

    return [    lerp(        w,        lerp(            v,            lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
            lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(
            v,
            lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
            lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
        )
    ),
        lerp(
            w,
            lerp(
                v,
                lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
                lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
            ),
            lerp(
                v,
                lerp(u, grad(p[AA], x, y, z - 1), grad(p[BA], x - 1, y, z - 1)),
                lerp(u, grad(p[AB], x, y - 1, z - 1), grad(p[BB], x - 1, y - 1, z - 1))
            )
        ),
        lerp(
            w,
            lerp(
                v,
                lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
                lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
            ),
            lerp(
                v,
                lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
                lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
            )
        )
    ];
}

const p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152,2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];*/



//Create triangles for the sphere
/*function triangle(a, b, c, size) {
    pointsArray.push(vec4(a[0], a[1], a[2], size));
    pointsArray.push(vec4(b[0], b[1], b[2], size));
    pointsArray.push(vec4(c[0], c[1], c[2], size));
    normalsArray.push(a[0], a[1], a[2], 0.0);
    normalsArray.push(b[0], b[1], b[2], 0.0);
    normalsArray.push(c[0], c[1], c[2], 0.0);
    index += 3;
}*/

//Subdivide sphere triangles for the tetrahedron function
/*function divideTriangle(a, b, c, count, size) {
    if ( count > 0 ) {
        let ab = mix( a, b, 0.5);
        let ac = mix( a, c, 0.5);
        let bc = mix( b, c, 0.5);

        //Calculate ab, ac, bc points
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        //Recursively call function with the points
        divideTriangle( a, ab, ac, count - 1, size);
        divideTriangle( ab, b, bc, count - 1, size);
        divideTriangle( bc, c, ac, count - 1, size);
        divideTriangle( ab, bc, ac, count - 1, size);
    }
    //When all the points are created call the triangle helper function
    else {
        triangle(a, b, c, size);
    }
}



//Tetrahedron sphere generation
function tetrahedron(a, b, c, d, n, size) {
    divideTriangle(a, b, c, n, size);
    divideTriangle(d, c, b, n, size);
    divideTriangle(a, d, b, n, size);
    divideTriangle(a, c, d, n, size);
}*/


/*function generatePlanet(subdivisions, size){     //Sphere starting subdivisions
    let va = vec4(0.0, 0.0, -1.0, 1/size);                      //Sphere tetrahedron va value
    let vb = vec4(0.0, 0.942809, 0.333333, 1/size);             //Sphere tetrahedron vb value
    let vc = vec4(-0.816497, -0.471405, 0.333333, 1/size);      //Sphere tetrahedron vc value
    let vd = vec4(0.816497, -0.471405, 0.333333, 1/size);       //Sphere tetrahedron vd value

    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    pointsArray = [];
    normalsArray = [];

    //tetrahedron(va, vb, vc, vd, subdivisions, 1/size);

    baseIco(1/size);
}

function noiseNone(x,y,z){
    return vec3(x,y,z);
}*/


// function baseIco(size) {
//     triangle(vertices[0], vertices[8], vertices[4], size);
//     triangle(vertices[0], vertices[6], vertices[10], size);
//     triangle(vertices[2], vertices[4], vertices[9], size);
//     triangle(vertices[2], vertices[6], vertices[4], size);
//     triangle(vertices[1], vertices[0], vertices[8], size);
//     triangle(vertices[1], vertices[10], vertices[0], size);
//     triangle(vertices[3], vertices[9], vertices[2], size);
//     triangle(vertices[3], vertices[5], vertices[9], size);
//     triangle(vertices[1], vertices[8], vertices[5], size);
//     triangle(vertices[1], vertices[7], vertices[5], size);
//     triangle(vertices[3], vertices[11], vertices[7], size);
//     triangle(vertices[4], vertices[6], vertices[0], size);
//     triangle(vertices[3], vertices[2], vertices[11], size);
//     triangle(vertices[6], vertices[11], vertices[2], size);
//     triangle(vertices[10], vertices[6], vertices[11], size);
//     triangle(vertices[3], vertices[7], vertices[5], size);
//     triangle(vertices[10], vertices[1], vertices[7], size);
//     triangle(vertices[7], vertices[10], vertices[11], size);
//     triangle(vertices[8], vertices[9], vertices[4], size);
//     triangle(vertices[8], vertices[9], vertices[5], size);
// }

/*function baseIco(size) {
    let indices = [0,8,4, 0,6,10, 2,4,9, 2,6,4, 1,0,8, 1,10,0, 3,9,2, 3,5,9, 1,8,5, 1,7,5, 3,11,7, 4,6,0, 3,2,11, 6,11,2, 10,6,11, 3,7,5, 10,1,7, 7,10,11, 8,9,4, 8,9,5];
    for (let i = 0; i < indices.length; i += 3) {
        let a = vertices[indices[i]];
        let b = vertices[indices[i + 1]];
        let c = vertices[indices[i + 2]];
        let ab = mix(a, b, 0.5);
        let bc = mix(b, c, 0.5);
        let ac = mix(a, c, 0.5);
        triangle(vertices[a], vertices[b], vertices[c], size);
    }
    return indices;
}*/

//Create triangles for the sphere
// function triangle(a, b, c, size) {
//     pointsArray.push(vec4(a[0], a[1], a[2], size));
//     pointsArray.push(vec4(b[0], b[1], b[2], size));
//     pointsArray.push(vec4(c[0], c[1], c[2], size));
//     normalsArray.push(a[0], a[1], a[2], 0.0);
//     normalsArray.push(b[0], b[1], b[2], 0.0);
//     normalsArray.push(c[0], c[1], c[2], 0.0);
//     index += 3;
// }









//Create triangles for the sphere
function triangle(a, b, c, size) {
    let center = vec3(0, 0, 0);
    let normalizedA = normalize(vec3(a[0]-center[0], a[1]-center[1], a[2]-center[2]));
    let normalizedB = normalize(vec3(b[0]-center[0], b[1]-center[1], b[2]-center[2]));
    let normalizedC = normalize(vec3(c[0]-center[0], c[1]-center[1], c[2]-center[2]));
    pointsArray.push(vec4(normalizedA[0], normalizedA[1], normalizedA[2], size));
    pointsArray.push(vec4(normalizedB[0], normalizedB[1], normalizedB[2], size));
    pointsArray.push(vec4(normalizedC[0], normalizedC[1], normalizedC[2], size));
    normalsArray.push(normalizedA[0], normalizedA[1], normalizedA[2], 0.0);
    normalsArray.push(normalizedB[0], normalizedB[1], normalizedB[2], 0.0);
    normalsArray.push(normalizedC[0], normalizedC[1], normalizedC[2], 0.0);
    index += 3;
}

function subdivideTriangle(a, b, c, size, subdivisions) {
    if (subdivisions <= 0) {
        triangle(a, b, c, size);
    } else {
        let ab = mix(a, b, 0.5);
        let bc = mix(b, c, 0.5);
        let ac = mix(a, c, 0.5);
        subdivideTriangle(a, ab, ac, size, subdivisions - 1);
        subdivideTriangle(ab, b, bc, size, subdivisions - 1);
        subdivideTriangle(bc, c, ac, size, subdivisions - 1);
        subdivideTriangle(ab, bc, ac, size, subdivisions - 1);
    }
}

function icosahedron(size, subdivisions) {
    let t = (1.0 + Math.sqrt(5.0)) / 2.0;
    let vertices = [ vec3(-1, t, 0), vec3(1, t, 0), vec3(-1, -t, 0), vec3(1, -t, 0), vec3(0, -1, t), vec3(0, 1, t), vec3(0, -1, -t), vec3(0, 1, -t), vec3(t, 0, -1), vec3(t, 0, 1), vec3(-t, 0, -1), vec3(-t, 0, 1)  ];
    let indices = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1 ];
    for (let i = 0; i < indices.length; i += 3) {
        let a = vertices[indices[i]];
        let b = vertices[indices[i + 1]];
        let c = vertices[indices[i + 2]];
        subdivideTriangle(a, b, c, size, subdivisions);
    }
    return indices;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
//Draw a sphere
export function drawSphere(x, y, z, subdivisions, size, angleY, angleX){
    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    pointsArray = [];
    normalsArray = [];

    //Create a planet
    icosahedron(1/size, subdivisions);

    //Send normals to the buffer
    let vNormal = GM.getGl().createBuffer();
    GM.getGl().bindBuffer(GM.getGl().ARRAY_BUFFER, vNormal);
    GM.getGl().bufferData(GM.getGl().ARRAY_BUFFER, flatten(normalsArray), GM.getGl().STATIC_DRAW);

    //Send normal positions to the vertex shader as vNormal
    let vNormalPosition = GM.getGl().getAttribLocation( GM.getProgram(), "vNormal");
    GM.getGl().vertexAttribPointer(vNormalPosition, 4, GM.getGl().FLOAT, false, 0, 0);
    GM.getGl().enableVertexAttribArray(vNormalPosition);

    //Send modelViewMatrix to the vertex shader
    modelViewMatrixLoc = GM.getGl().getUniformLocation( GM.getProgram(), "modelViewMatrix" );

    //Clear the buffers
    GM.getGl().clear(GM.getGl().COLOR_BUFFER_BIT | GM.getGl().DEPTH_BUFFER_BIT);

    //Send sphere points to the buffer
    let vBuffer = GM.getGl().createBuffer();
    GM.getGl().bindBuffer(GM.getGl().ARRAY_BUFFER, vBuffer);
    GM.getGl().bufferData(GM.getGl().ARRAY_BUFFER, flatten(pointsArray), GM.getGl().STATIC_DRAW);

    // Get the location of the u_PointSize uniform
    const pointSizeUniformLocation = GM.getGl().getUniformLocation(GM.getProgram(), "u_PointSize");
    GM.getGl().uniform1f(pointSizeUniformLocation, 5.0);

    //Send sphere point positions to the vertex shader
    let vPosition = GM.getGl().getAttribLocation(GM.getProgram(), "vPosition");
    GM.getGl().vertexAttribPointer(vPosition, 4, GM.getGl().FLOAT, false, 0, 0);
    GM.getGl().enableVertexAttribArray(vPosition);

    let yawMatrix = rotateY(angleY);
    let pitchMatrix = rotateX(angleX);
    // Combine the matrices in the desired order
    let rotateMatrix = mult(yawMatrix, pitchMatrix);
    let translateMatrix = translate(x, y, z);
    modelViewMatrix = mult(translateMatrix, rotateMatrix);

    // Send the model-view matrix to the shader
    GM.getGl().uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //GM.getGl().drawArrays(GM.getGl().POINTS, 0, index);

    //Draw triangles or line strips for the sphere depending on if shaded or not
    for (let i = 0; i < index-1; i += 3) {
        GM.getGl().drawArrays(GM.getGl().LINE_LOOP, i, 3);      //Shaded
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
