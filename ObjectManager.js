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

//Create triangles for the sphere
function triangle(a, b, c, size) {
    pointsArray.push(vec4(a[0], a[1], a[2], size));
    pointsArray.push(b);
    pointsArray.push(c);
    normalsArray.push(a[0],a[1], a[2], 0.0);
    normalsArray.push(b[0],b[1], b[2], 0.0);
    normalsArray.push(c[0],c[1], c[2], 0.0);
    index += 3;
}

//Subdivide sphere triangles for the tetrahedron function
function divideTriangle(a, b, c, count, size) {
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
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw Sphere
//Draw a sphere
export function drawSphere(x, y, z, size){
    let subdivisions = 4;                                       //Sphere starting subdivisions
    let va = vec4(0.0, 0.0, -1.0, 1/size);                      //Sphere tetrahedron va value
    let vb = vec4(0.0, 0.942809, 0.333333, 1/size);             //Sphere tetrahedron vb value
    let vc = vec4(-0.816497, -0.471405, 0.333333, 1/size);      //Sphere tetrahedron vc value
    let vd = vec4(0.816497, -0.471405, 0.333333, 1/size);       //Sphere tetrahedron vd value

    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    pointsArray = [];
    normalsArray = [];

    tetrahedron(va, vb, vc, vd, subdivisions, 1/size);

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