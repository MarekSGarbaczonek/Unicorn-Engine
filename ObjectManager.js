import * as GM from "/GraphicsManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
let pointsArray;                                        //Triangle points array
let normalsArray;                                       //Triangle normals array
let index = 0;                                          //Triangle index
let modelViewMatrix, modelViewMatrixLoc;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
//Index getter
export function getIndex(){
    return index;
}

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
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];


//Create triangles for the sphere
function triangle(a, b, c, size, noiseFunc) {

    let amplitude = 1;
    let frequency = 1;
    let offsetA = noiseFunc(a[0]*amplitude, a[1]*amplitude, a[2]*amplitude, frequency);
    let offsetB = noiseFunc(b[0]*amplitude, b[1]*amplitude, b[2]*amplitude, frequency);
    let offsetC = noiseFunc(c[0]*amplitude, c[1]*amplitude, c[2]*amplitude, frequency);

    pointsArray.push(vec4(a[0] + offsetA[0], a[1] + offsetA[1], a[2] + offsetA[2], size));
    pointsArray.push(vec4(b[0] + offsetB[0], b[1] + offsetB[1], b[2] + offsetB[2], size));
    pointsArray.push(vec4(c[0] + offsetC[0], c[1] + offsetC[1], c[2] + offsetC[2], size));

    normalsArray.push(a[0], a[1], a[2], 0.0);
    normalsArray.push(b[0], b[1], b[2], 0.0);
    normalsArray.push(c[0], c[1], c[2], 0.0);

    index += 3;
}

//Subdivide sphere triangles for the tetrahedron function
function divideTriangle(a, b, c, count, size, noiseFunc) {
    if ( count > 0 ) {
        let ab = mix( a, b, 0.5);
        let ac = mix( a, c, 0.5);
        let bc = mix( b, c, 0.5);

        //Calculate ab, ac, bc points
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        //Recursively call function with the points
        divideTriangle( a, ab, ac, count - 1, size, noiseFunc);
        divideTriangle( ab, b, bc, count - 1, size, noiseFunc);
        divideTriangle( bc, c, ac, count - 1, size, noiseFunc);
        divideTriangle( ab, bc, ac, count - 1, size, noiseFunc);
    }
    //When all the points are created call the triangle helper function
    else {
        triangle(a, b, c, size, noiseFunc);
    }
}

//Tetrahedron sphere generation
function tetrahedron(a, b, c, d, n, size, noiseFunc) {
    divideTriangle(a, b, c, n, size, noiseFunc);
    divideTriangle(d, c, b, n, size, noiseFunc);
    divideTriangle(a, d, b, n, size, noiseFunc);
    divideTriangle(a, c, d, n, size, noiseFunc);
}

function generatePlanet(size){
    let subdivisions = 1;                                       //Sphere starting subdivisions
    let va = vec4(0.0, 0.0, -1.0, 1/size);                      //Sphere tetrahedron va value
    let vb = vec4(0.0, 0.942809, 0.333333, 1/size);             //Sphere tetrahedron vb value
    let vc = vec4(-0.816497, -0.471405, 0.333333, 1/size);      //Sphere tetrahedron vc value
    let vd = vec4(0.816497, -0.471405, 0.333333, 1/size);       //Sphere tetrahedron vd value

    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    pointsArray = [];
    normalsArray = [];

    tetrahedron(va, vb, vc, vd, subdivisions, 1/size, perlin3);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
//Draw a sphere
export function drawSphere(x, y, z, size){
    //Create a planet
    generatePlanet(size);

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

    //Send sphere point positions to the vertex shader
    let vPosition = GM.getGl().getAttribLocation(GM.getProgram(), "vPosition");
    GM.getGl().vertexAttribPointer(vPosition, 4, GM.getGl().FLOAT, false, 0, 0);
    GM.getGl().enableVertexAttribArray(vPosition);

    //Update the modelViewMatrix with a new transform for the sphere
    modelViewMatrix = translate(x, y, z);
    GM.getGl().uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
