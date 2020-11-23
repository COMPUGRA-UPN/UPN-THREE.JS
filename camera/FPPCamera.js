import * as THREE from '../node_modules/three/build/three.module.js';
import { FPPControls } from '../controls/FPPControls.js';


class FPPCamera {
    constructor(render) {
        this.camera;
        this.renderT = render;
<<<<<<< HEAD
        this.fov = 60;
=======
        this.fov = 75;
>>>>>>> origin/jose
        this.aspect = 1920 / 1080;
        this.near = 1.0;
        this.far = 1000.0;
        this._previousRAF;
        this._Initialize();

        return this.camera;
    }

    _Initialize() {

        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
<<<<<<< HEAD
        this.camera.position.set(0, 20, 0);
=======
        this.camera.position.set(0,13,0);
>>>>>>> origin/jose
    }

}

export default FPPCamera;