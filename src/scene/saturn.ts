import * as THREE from "three";

export function setupSaturn(scene: THREE.Scene) {
    const textureLoader = new THREE.TextureLoader();

    const saturnTexture = textureLoader.load(
        "/textures/saturn.jpg",
    );
    const saturnBumpTexture = textureLoader.load(
        "/textures/saturn-bump.jpg",
    );
    const saturnNormalTexture = textureLoader.load(
        "/textures/saturn-normal.jpg",
    );


    const saturnGeometry = new THREE.SphereGeometry(5, 64, 64);
    const saturnMaterial = new THREE.MeshPhysicalMaterial({
        map: saturnTexture,
        bumpMap: saturnBumpTexture,
        normalMap: saturnNormalTexture,
        // roughness: 1,
    });

    const saturnPosition = [0, 0, 0] as const;

    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturn.position.set(...saturnPosition)
    saturn.rotation.x = Math.PI / 7;
    saturn.receiveShadow = true;
    saturn.castShadow = true;

    const ringsGeometry = new THREE.RingGeometry(6, 12, 64);

    const ringsMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/textures/saturn_ring.jpg"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
    });
    const ringsMesh = new THREE.Mesh(ringsGeometry, ringsMaterial);
    ringsMesh.rotation.x = Math.PI / 2 + Math.PI / 7;
    // ringsMesh.rotation.z = 2 * Math.PI / 7;
    ringsMesh.receiveShadow = true;

    // ringsMesh.castShadow = true;
    scene.add(ringsMesh);
    scene.add(saturn);

    const moonTextures = [textureLoader.load(
        "/textures/moon1.jpg",
    ), textureLoader.load(
        "/textures/moon2.jpg",
    ), textureLoader.load(
        "/textures/moon3.jpg",
    )]

    const moonGeometries = [
        new THREE.SphereGeometry(1, 100, 100),
        new THREE.SphereGeometry(1.25, 100, 100),
        new THREE.SphereGeometry(0.75, 100, 100)
    ]

    const moonMaterials = moonTextures.map((moonTexture) => new THREE.MeshPhysicalMaterial({
        map: moonTexture,
    }));

    // const moonPositions = [
    //     [7, 0, 0],
    //     [9, 0, 0],
    //     [11, 0, 0],
    // ] as const;

    const moons = moonGeometries.map((moonGeometry, index) => {
            const moon = new THREE.Mesh(moonGeometry, moonMaterials[index]);
            moon.position.set(15 + index * 4, 0, 0);

            // invisible object to rotate the moon around
            const moonOrbit = new THREE.Object3D();
            moonOrbit.add(moon);
            // moonOrbit.rotation.x = Math.PI / 2;

            saturn.add(moonOrbit);
            return {moon, moonOrbit};
        }
    );
    return {saturn, moons, ringsMesh};
}
