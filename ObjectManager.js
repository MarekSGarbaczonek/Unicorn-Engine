let pointsArray;                                        //Triangle points array
let normalsArray;                                       //Triangle normals array
let index = 0;                                          //Triangle index
let subdivisions = 4;                                   //Sphere starting subdivisions

let va = vec4(0.0, 0.0, -1.0,1);                        //Sphere tetrahedron va value
let vb = vec4(0.0, 0.942809, 0.333333, 1);              //Sphere tetrahedron vb value
let vc = vec4(-0.816497, -0.471405, 0.333333, 1);       //Sphere tetrahedron vc value
let vd = vec4(0.816497, -0.471405, 0.333333,1);         //Sphere tetrahedron vd value

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions
//Create triangles for the sphere
function triangle(a, b, c) {
    pointsArray.push(a);
    pointsArray.push(b);
    pointsArray.push(c);
    normalsArray.push(a[0],a[1], a[2], 0.0);
    normalsArray.push(b[0],b[1], b[2], 0.0);
    normalsArray.push(c[0],c[1], c[2], 0.0);
    index += 3;
}

//Subdivide sphere triangles for the tetrahedron function
function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {
        let ab = mix( a, b, 0.5);
        let ac = mix( a, c, 0.5);
        let bc = mix( b, c, 0.5);

        //Calculate ab, ac, bc points
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        //Recursively call function with the points
        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    //When all the points are created call the triangle helper function
    else {
        triangle( a, b, c );
    }
}

//Tetrahedron sphere generation
function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sphere Helper Functions

//Draw a sphere
export function drawSphere(gl, program){
    //Reset the sphere points array points and normals then create new ones with the tetrahedron function
    pointsArray = [];
    normalsArray = [];

    tetrahedron(va, vb, vc, vd, subdivisions);

    //Send normals to the buffer
    let vNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vNormal);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    //Send normal positions to the vertex shader as vNormal
    let vNormalPosition = gl.getAttribLocation( program, "vNormal");
    gl.vertexAttribPointer(vNormalPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormalPosition);

    //Clear the buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Send sphere points to the buffer
    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    //Send sphere point positions to the vertex shader
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
}