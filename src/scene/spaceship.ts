import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
export const spaceShipData = {
    spaceship: null as THREE.Group | null
}
export function setupSpaceship(scene: THREE.Scene) {

    // load the base model
    const objLoader = new OBJLoader();
    objLoader.load("/models/fighter1.obj", (spaceship) => {
        // load the texture
        const textureLoader = new THREE.TextureLoader();
        const spaceshipTexture = textureLoader.load(
            "/models/robin.jpg",
        );

        // add the texture to the model
        const spaceshipMaterial = new THREE.MeshStandardMaterial({
            map: spaceshipTexture,
            // roughness: 1,
        });

        // add the texture to the model
        const spaceshipClone = spaceship.clone();
        spaceshipClone.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = spaceshipMaterial;
                }
            }
        );

        spaceshipClone.position.set(0, 5, 9);
        // spaceshipClone.rotation.set(-15,  2, 3);
        spaceshipClone.scale.set(10, 10, 10);
        spaceshipClone.rotation.y = Math.PI

        scene.add(spaceshipClone);
        spaceShipData.spaceship = spaceshipClone;

    });
}