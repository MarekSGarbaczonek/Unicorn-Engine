import * as GM from "./GraphicsManager.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
let pointsArray = [];                                        //Triangle points array
let normalsArray = [];                                       //Triangle normals array
let index = 0;                                          //Triangle index
let modelViewMatrix, modelViewMatrixLoc;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Variables
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
let noise = new Noise(Math.random());
let amplitude = 0.25;
let frequency = 1.0;

function applyPerlin3D(amplitude, frequency, normalizedA, normalizedB, normalizedC){
    normalizedA = vec3(normalizedA[0] + amplitude*noise.perlin3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]),
                       normalizedA[1] + amplitude*noise.perlin3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]),
                       normalizedA[2] + amplitude*noise.perlin3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]));
    normalizedB = vec3(normalizedB[0] + amplitude*noise.perlin3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]),
                       normalizedB[1] + amplitude*noise.perlin3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]),
                       normalizedB[2] + amplitude*noise.perlin3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]));
    normalizedC = vec3(normalizedC[0] + amplitude*noise.perlin3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]),
                       normalizedC[1] + amplitude*noise.perlin3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]),
                       normalizedC[2] + amplitude*noise.perlin3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]));

    return [normalizedA, normalizedB, normalizedC];
}

function applySimplex3D(amplitude, frequency, normalizedA, normalizedB, normalizedC){
    normalizedA = vec3(normalizedA[0] + amplitude*noise.simplex3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]),
                       normalizedA[1] + amplitude*noise.simplex3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]),
                       normalizedA[2] + amplitude*noise.simplex3(frequency*normalizedA[0], frequency*normalizedA[1], frequency*normalizedA[2]));
    normalizedB = vec3(normalizedB[0] + amplitude*noise.simplex3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]),
                       normalizedB[1] + amplitude*noise.simplex3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]),
                       normalizedB[2] + amplitude*noise.simplex3(frequency*normalizedB[0], frequency*normalizedB[1], frequency*normalizedB[2]));
    normalizedC = vec3(normalizedC[0] + amplitude*noise.simplex3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]),
                       normalizedC[1] + amplitude*noise.simplex3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]),
                       normalizedC[2] + amplitude*noise.simplex3(frequency*normalizedC[0], frequency*normalizedC[1], frequency*normalizedC[2]));

    return [normalizedA, normalizedB, normalizedC];
}

//Create triangles for the sphere
function triangle(a, b, c, size) {
    let center = vec3(0, 0, 0);
    let normalizedA = normalize(vec3(a[0]-center[0], a[1]-center[1], a[2]-center[2]));
    let normalizedB = normalize(vec3(b[0]-center[0], b[1]-center[1], b[2]-center[2]));
    let normalizedC = normalize(vec3(c[0]-center[0], c[1]-center[1], c[2]-center[2]));
    let perlinNoise = applyPerlin3D(0.15, 1.0, normalizedA, normalizedB, normalizedC);
    normalizedA = perlinNoise[0];
    normalizedB = perlinNoise[1];
    normalizedC = perlinNoise[2];
    // let simplexNoise = applySimplex3D(0.1, 3.0, normalizedA, normalizedB, normalizedC);
    // normalizedA = simplexNoise[0];
    // normalizedB = simplexNoise[1];
    // normalizedC = simplexNoise[2];
    pointsArray.push(vec4(normalizedA[0], normalizedA[1], normalizedA[2], size));
    pointsArray.push(vec4(normalizedB[0], normalizedB[1], normalizedB[2], size));
    pointsArray.push(vec4(normalizedC[0], normalizedC[1], normalizedC[2], size));
    normalsArray.push(normalizedA[0], normalizedA[1], normalizedA[2], 0.0);
    normalsArray.push(normalizedB[0], normalizedB[1], normalizedB[2], 0.0);
    normalsArray.push(normalizedC[0], normalizedC[1], normalizedC[2], 0.0);
    index += 3;
}

//Recursively subdivide
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

//Create an icosahedron
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
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
//Draw a sphere
export function drawSphere(x, y, z, subdivisions, size, angleY, angleX, isLines){

    //Create a black background color
    GM.getGl().clearColor( 0.0, 0.0, 0.0, 1.0 );

    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    index = 0;
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

    if (isLines) {
        for (let i = 0; i < index-1; i += 3) {
            GM.getGl().drawArrays(GM.getGl().LINE_LOOP, i, 3);      //Shaded
        }
    }
    else{
        for (let i = 0; i < index-1; i += 3) {
            GM.getGl().drawArrays(GM.getGl().TRIANGLES, i, 3);      //Shaded
        }
    }

    //GM.getGl().drawArrays(GM.getGl().POINTS, 0, index);

    //Draw triangles or line strips for the sphere depending on if shaded or not
    // for (let i = 0; i < index-1; i += 3) {
    //     GM.getGl().drawArrays(GM.getGl().LINE_LOOP, i, 3);      //Shaded
    // }

    // const startTime = performance.now();
    // const duration = performance.now() - startTime;
    // console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
