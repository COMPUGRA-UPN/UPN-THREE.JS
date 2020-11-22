import * as THREE from '../node_modules/three/build/three.module.js';
import { FPPControls } from '../controls/FPPControls.js';
let controls;
const clock = new THREE.Clock();

class TPPCamera {
    constructor(render) {
        this.camera;
        this.renderT = render;
        this.fov = 60;
        this.aspect = 1920 / 1080;
        this.near = 1.0;
        this.far = 1000.0;
        this._previousRAF;
        this._Initialize();
        this._RAF();
        return this.camera;
    }

    _Initialize() {

        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.set(0, 19, 0);

        controls = new FPPControls(this.camera, this.renderT.domElement, false);
        controls.movementSpeed = 100;
        controls.lookSpeed = 0.1;
        controls.lookVertical = false;
    }
    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._RAF();
            controls.update(clock.getDelta());
        });
    }

}

export default TPPCamera;