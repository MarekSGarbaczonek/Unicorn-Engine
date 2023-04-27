let noise = new Noise(Math.random());

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

export function applySphericalSimplex3D(amplitude, frequency, pointA, pointB, pointC){
    // Convert Cartesian coordinates to spherical coordinates
    const sphericalA = cartesianToSpherical(pointA);
    const sphericalB = cartesianToSpherical(pointB);
    const sphericalC = cartesianToSpherical(pointC);

    // Generate noise in spherical coordinates
    const noisySphericalA = vec3(
        sphericalA[0] + amplitude * noise.simplex3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        ),
        sphericalA[1] + amplitude * noise.simplex3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        ),
        sphericalA[2] + amplitude * noise.simplex3(
            frequency * sphericalA[0],
            frequency * sphericalA[1],
            frequency * sphericalA[2]
        )
    );
    const noisySphericalB = vec3(
        sphericalB[0] + amplitude * noise.simplex3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        ),
        sphericalB[1] + amplitude * noise.simplex3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        ),
        sphericalB[2] + amplitude * noise.simplex3(
            frequency * sphericalB[0],
            frequency * sphericalB[1],
            frequency * sphericalB[2]
        )
    );
    const noisySphericalC = vec3(
        sphericalC[0] + amplitude * noise.simplex3(
            frequency * sphericalC[0],
            frequency * sphericalC[1],
            frequency * sphericalC[2]
        ),
        sphericalC[1] + amplitude * noise.simplex3(
            frequency * sphericalC[0],
            frequency * sphericalC[1],
            frequency * sphericalC[2]
        ),
        sphericalC[2] + amplitude * noise.simplex3(
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
