import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {setupSkyBox} from "./sky-box.ts";
import {setupSaturn} from "./saturn.ts";
import {setupSun} from "./sun.ts";
import {setupAsteroids} from "./asteroids.ts";
import {setupSpaceship, spaceShipData} from "./spaceship.ts";

export async function initScene() {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.x = 33;
    camera.position.y = 12;
    camera.position.z = 22.5;

    // Set up the controls
    const orbitControls = new OrbitControls(camera, document.body);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = true;
    orbitControls.zoomSpeed = 1;
    orbitControls.enableRotate = true;
    orbitControls.rotateSpeed = 1;
    orbitControls.enablePan = true;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Use the ACES Filmic tone mapping for HDR
    renderer.toneMappingExposure = 1.5; // Adjust exposure for your scene
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Apply sRGB encoding
    renderer.shadowMap.enabled = true; // Enable rendering shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Default is PCFShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // Add ambient light to avoid completely dark areas
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(ambientLight);

    // Handle window resizing
    window.addEventListener("resize", () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        orbitControls.update();
        renderer.setSize(newWidth, newHeight);
    });


    setupSkyBox(scene);
    const {saturn, moons, ringsMesh} = setupSaturn(scene)
    setupSun(scene)
    setupAsteroids(scene)
    setupSpaceship(scene)

    // Rendering loop
    const animate = (_time: number) => {
        orbitControls.update();
        renderer.render(scene, camera);

        // make the saturn go around its axis, and around the sun
        saturn.rotation.y += 0.005;
        ringsMesh.rotation.z += 0.005;

        // rotate the moons around the saturn
        moons.forEach((moonSystem, index,) => {
            moonSystem.moonOrbit.rotation.y += 0.002 + index / 1000;
        })

        if (spaceShipData.spaceship) {
            const angle = 0.0001 * _time;
            const radius = 30;
            // spaceShipData.spaceship.position.x = Math.sin();
            spaceShipData.spaceship.position.x = radius * Math.cos(angle);
            spaceShipData.spaceship.position.z = -radius * Math.sin(angle);
            spaceShipData.spaceship.rotation.y =
                -Math.atan2(-spaceShipData.spaceship.position.z, -spaceShipData.spaceship.position.x) +
                Math.PI / 2;

        }

        console.log(camera.position)
    };

    // Starting the animation loop
    renderer.setAnimationLoop(animate);
}
