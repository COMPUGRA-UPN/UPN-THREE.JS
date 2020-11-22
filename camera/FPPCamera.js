import * as THREE from '../node_modules/three/build/three.module.js';



class FPPCamera {
    constructor() {
        this.camera;
        this.fov = 60;
        this.aspect = 1920 / 1080;
        this.near = 1.0;
        this.far = 1000.0;
        this._Initialize();
        return this.camera;
    }

    _Initialize() {
        
        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.set(0, 19, 0);
    }
}

export default FPPCamera;