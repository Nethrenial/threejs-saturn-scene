import * as THREE from 'three'
// import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


export function setupAsteroids(scene: THREE.Scene) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/models/asteroid_model.glb", (asteroid) => {
        for (let i = 0; i < 1000; i++) {
            const asteroidClone = asteroid.scene.clone();
            asteroidClone.position.set(
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500
            );
            asteroidClone.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );
            const scale = Math.random() * 1.1;
            asteroidClone.scale.set(scale, scale, scale);
            //
            // // make the coloreither black, white or dark brown
            // const color = Math.random();
            // if (color < 0.5) {
            //     // @ts-ignore
            //     asteroidClone.children[0].material.color.set(0x000000);
            // } else if (color < 0.8) {
            //     // @ts-ignore
            //     asteroidClone.children[0].material.color.set(0x757575);
            // } else {
            //     // @ts-ignore
            //     asteroidClone.children[0].material.color.set(0xFFFFFF)
            // }

            scene.add(asteroidClone);
        }
    });

    // add 100000 asteroid randomly throughout the scene


}