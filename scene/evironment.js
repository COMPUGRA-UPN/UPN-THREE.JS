import * as THREE from '../node_modules/three/build/three.module.js';
import Lights from '../light/lights.js';


    class LoadScene {
    constructor(scene) {
        this.scene=scene;
        this._Initialize();
    }

    _Initialize() {
        let l = new Lights();
        this.scene.add(l.directionalLight);
        this.scene.add(l.ambientLight);
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '../models/environment/resources/posx.jpg',
            '../models/environment/resources/negx.jpg',
            '../models/environment/resources/posy.jpg',
            '../models/environment/resources/negy.jpg',
            '../models/environment/resources/posz.jpg',
            '../models/environment/resources/negz.jpg',
        ]);
        this.scene.background = texture;
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshLambertMaterial({
                color: 0x202020, side: THREE.DoubleSide,
            }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);
    }
    loadCharacter(){
        console.log("Asdsa");
    }
}

export default LoadScene;
