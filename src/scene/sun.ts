import * as THREE from "three";

export function setupSun(scene: THREE.Scene) {
    const textureLoader = new THREE.TextureLoader();

    const sunTexture = textureLoader.load(
        "/textures/sun.jpg",
    );
    const sunGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
        map: sunTexture,
    });

    const sunPosition = [-250,  25, -60] as const;

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(...sunPosition)
    // sun.receiveShadow = true;
    // sun.castShadow = true;
    scene.add(sun);

    // add a point light with a lot of intensity that looks like it's coming from the sun
    const sunLight = new THREE.PointLight(0xFFFFFF, 0.5, 0, 0);
    sunLight.position.set(...sunPosition);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 1000;




    scene.add(sunLight)

    // add an aura around the sun with a bloom effect
    const sunAuraGeometry = new THREE.SphereGeometry(10, 100, 100);
    const sunAuraMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFA5A5,
        transparent: true,
        opacity: 0.3,
    });
    const sunAura = new THREE.Mesh(sunAuraGeometry, sunAuraMaterial);
    sunAura.position.set(...sunPosition)
    scene.add(sunAura);

    return sun;
}
