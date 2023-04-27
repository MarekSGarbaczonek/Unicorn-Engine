let noise = new Noise(Math.random());

// export function applySphericalPerlin3D(amplitude, frequency, a, b, c) {
//     let aNoise = applyNoise(amplitude, frequency, a);
//     let bNoise = applyNoise(amplitude, frequency, b);
//     let cNoise = applyNoise(amplitude, frequency, c);
//
//     let aNormal = normalize(a);
//     let bNormal = normalize(b);
//     let cNormal = normalize(c);
//
//     let aNew = aNormal.map((val, i) => val + aNoise[i]);
//     let bNew = bNormal.map((val, i) => val + bNoise[i]);
//     let cNew = cNormal.map((val, i) => val + cNoise[i]);
//
//     let newLength = length(a) + aNoise[0]; // assume the noise values are similar for all points
//
//     return [
//         scale(newLength, aNew),
//         scale(newLength, bNew),
//         scale(newLength, cNew)
//     ];
// }
//
// function scale(length, vector) {
//     return vector.map(val => val * length);
// }
//

//
// export function applySphericalPerlin3D(amplitude, frequency, a, b, c) {
//     let aSpherical = cartesianToSpherical(a);
//     let bSpherical = cartesianToSpherical(b);
//     let cSpherical = cartesianToSpherical(c);
//
//     let aNoise = applyNoise(amplitude, frequency, aSpherical);
//     let bNoise = applyNoise(amplitude, frequency, bSpherical);
//     let cNoise = applyNoise(amplitude, frequency, cSpherical);
//
//     let aNew = sphericalToCartesian(
//         aSpherical[0] + aNoise[0],
//         aSpherical[1] + aNoise[1],
//         aSpherical[2] + aNoise[2]
//     );
//     let bNew = sphericalToCartesian(
//         bSpherical[0] + bNoise[0],
//         bSpherical[1] + bNoise[1],
//         bSpherical[2] + bNoise[2]
//     );
//     let cNew = sphericalToCartesian(
//         cSpherical[0] + cNoise[0],
//         cSpherical[1] + cNoise[1],
//         cSpherical[2] + cNoise[2]
//     );
//
//     return [aNew, bNew, cNew];
// }


// function cartesianToSpherical(cartesian) {
//     let r = length(cartesian);
//     let theta = Math.acos(cartesian[2] / r);
//     let phi = Math.atan2(cartesian[1], cartesian[0]);
//     return [r, theta, phi];
// }
//
// function sphericalToCartesian(r, theta, phi) {
//     let x = r * Math.sin(theta) * Math.cos(phi);
//     let y = r * Math.sin(theta) * Math.sin(phi);
//     let z = r * Math.cos(theta);
//     return [x, y, z];
// }
//
// function applyNoise(amplitude, frequency, point) {
//     let noiseX = noise.perlin3(point[0] * frequency, point[1], point[2]);
//     let noiseY = noise.perlin3(point[0], point[1] * frequency, point[2]);
//     let noiseZ = noise.perlin3(point[0], point[1], point[2] * frequency);
//
//     return [noiseX, noiseY, noiseZ].map(n => n * amplitude);
// }



// export function applySphericalPerlin3D(amplitude, frequency, pointA, pointB, pointC){
//     // Convert Cartesian coordinates to spherical coordinates
//     const sphericalA = cartesianToSpherical(pointA);
//     const sphericalB = cartesianToSpherical(pointB);
//     const sphericalC = cartesianToSpherical(pointC);
//
//     // Generate noise in spherical coordinates
//     const noisySphericalA = vec3(
//         sphericalA[0] + amplitude * noise.perlin3(
//             frequency * sphericalA[0],
//             frequency * sphericalA[1],
//             frequency * sphericalA[2]
//         ),
//         sphericalA[1] + amplitude * noise.perlin3(
//             frequency * sphericalA[0],
//             frequency * sphericalA[1],
//             frequency * sphericalA[2]
//         ),
//         sphericalA[2] + amplitude * noise.perlin3(
//             frequency * sphericalA[0],
//             frequency * sphericalA[1],
//             frequency * sphericalA[2]
//         )
//     );
//     const noisySphericalB = vec3(
//         sphericalB[0] + amplitude * noise.perlin3(
//             frequency * sphericalB[0],
//             frequency * sphericalB[1],
//             frequency * sphericalB[2]
//         ),
//         sphericalB[1] + amplitude * noise.perlin3(
//             frequency * sphericalB[0],
//             frequency * sphericalB[1],
//             frequency * sphericalB[2]
//         ),
//         sphericalB[2] + amplitude * noise.perlin3(
//             frequency * sphericalB[0],
//             frequency * sphericalB[1],
//             frequency * sphericalB[2]
//         )
//     );
//     const noisySphericalC = vec3(
//         sphericalC[0] + amplitude * noise.perlin3(
//             frequency * sphericalC[0],
//             frequency * sphericalC[1],
//             frequency * sphericalC[2]
//         ),
//         sphericalC[1] + amplitude * noise.perlin3(
//             frequency * sphericalC[0],
//             frequency * sphericalC[1],
//             frequency * sphericalC[2]
//         ),
//         sphericalC[2] + amplitude * noise.perlin3(
//             frequency * sphericalC[0],
//             frequency * sphericalC[1],
//             frequency * sphericalC[2]
//         )
//     );
//
//     // Convert back to Cartesian coordinates
//     const noisyA = sphericalToCartesian(noisySphericalA);
//     const noisyB = sphericalToCartesian(noisySphericalB);
//     const noisyC = sphericalToCartesian(noisySphericalC);
//
//     return [noisyA, noisyB, noisyC];
// }

// export function applySphericalPerlin3D(amplitude, frequency, pointA, pointB, pointC){
//     // Convert Cartesian coordinates to spherical coordinates
//     const sphericalA = cartesianToSpherical(pointA);
//     const sphericalB = cartesianToSpherical(pointB);
//     const sphericalC = cartesianToSpherical(pointC);
//
//     // Generate noise in spherical coordinates
//     const noisySphericalA = vec3(
//         sphericalA[0] + amplitude,
//         // sphericalA[0] + amplitude * noise.perlin3(
//         //     frequency * sphericalA[0] + pointA[0],
//         //     frequency * sphericalA[1] + pointA[1],
//         //     frequency * sphericalA[2] + pointA[2]
//         // ),
//         sphericalA[1],
//         sphericalA[2]
//     );
//     const noisySphericalB = vec3(
//         sphericalB[0] + amplitude,
//         // sphericalB[0] + amplitude * noise.perlin3(
//         //     frequency * sphericalB[0] + pointB[0],
//         //     frequency * sphericalB[1] + pointB[1],
//         //     frequency * sphericalB[2] + pointB[2]
//         // ),
//         sphericalB[1],
//         sphericalB[2]
//     );
//     const noisySphericalC = vec3(
//         sphericalC[0] + amplitude,
//         // sphericalC[0] + amplitude * noise.perlin3(
//         //     frequency * sphericalC[0] + pointC[0],
//         //     frequency * sphericalC[1] + pointC[1],
//         //     frequency * sphericalC[2] + pointC[2]
//         // ),
//         sphericalC[1],
//         sphericalC[2]
//     );
//
//     // Convert back to Cartesian coordinates and calculate the normals
//     const noisyA = vec3(sphericalToCartesian(noisySphericalA));
//     const noisyB = vec3(sphericalToCartesian(noisySphericalB));
//     const noisyC = vec3(sphericalToCartesian(noisySphericalC));
//
//     const normalA = vec3(normalize(vec3(noisyA[0] - pointA[0], noisyA[1] - pointA[1], noisyA[2] - pointA[2])));
//     const normalB = vec3(normalize(vec3(noisyB[0] - pointB[0], noisyB[1] - pointB[1], noisyB[2] - pointB[2])));
//     const normalC = vec3(normalize(vec3(noisyC[0] - pointC[0], noisyC[1] - pointC[1], noisyC[2] - pointC[2])));
//
//     return [normalA, normalB, normalC];
// }
//
//
export function applySphericalPerlin3D(amplitude, frequency, pointA, pointB, pointC){
    // Convert Cartesian coordinates to spherical coordinates
    const sphericalA = cartesianToSpherical(pointA);
    const sphericalB = cartesianToSpherical(pointB);
    const sphericalC = cartesianToSpherical(pointC);

    // Generate noise in spherical coordinates
    const noisySphericalA = vec3(
        sphericalA[0] + amplitude * noise.perlin3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        ),
        sphericalA[1] + amplitude * noise.perlin3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        ),
        sphericalA[2] + amplitude * noise.perlin3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        )
    );
    const noisySphericalB = vec3(
        sphericalB[0] + amplitude * noise.perlin3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        ),
        sphericalB[1] + amplitude * noise.perlin3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        ),
        sphericalB[2] + amplitude * noise.perlin3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        )
    );
    const noisySphericalC = vec3(
        sphericalC[0] + amplitude * noise.perlin3(
            frequency * sphericalC[0],
            frequency * sphericalC[1],
            frequency * sphericalC[2]
        ),
        sphericalC[1] + amplitude * noise.perlin3(
            frequency * sphericalC[0],
            frequency * sphericalC[1],
            frequency * sphericalC[2]
        ),
        sphericalC[2] + amplitude * noise.perlin3(
            frequency * sphericalC[0],
            frequency * sphericalC[1],
            frequency * sphericalC[2]
        )
    );

    // Convert back to Cartesian coordinates
    const noisyA = sphericalToCartesian(noisySphericalA);
    const noisyB = sphericalToCartesian(noisySphericalB);
    const noisyC = sphericalToCartesian(noisySphericalC);

    return [noisyA, noisyB, noisyC];
}


// Helper function to convert Cartesian coordinates to spherical coordinates
function cartesianToSpherical(cartesian){
    const r = length(cartesian);
    const theta = Math.acos(cartesian[2] / r);
    const phi = Math.atan2(cartesian[1], cartesian[0]);
    return [r, theta, phi];
}

// Helper function to convert spherical coordinates to Cartesian coordinates
function sphericalToCartesian(spherical){
    const x = spherical[0] * Math.sin(spherical[1]) * Math.cos(spherical[2]);
    const y = spherical[0] * Math.sin(spherical[1]) * Math.sin(spherical[2]);
    const z = spherical[0] * Math.cos(spherical[1]);
    return vec3(x, y, z);
}
