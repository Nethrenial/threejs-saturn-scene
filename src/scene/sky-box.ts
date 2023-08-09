import * as THREE from "three";

export function setupSkyBox(scene: THREE.Scene) {

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    "textures/skybox/space_ft.png",
    "textures/skybox/space_bk.png",
    "textures/skybox/space_up.png",
    "textures/skybox/space_dn.png",
    "textures/skybox/space_rt.png",
    "textures/skybox/space_lf.png",
  ])
}
