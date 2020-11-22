import * as THREE from '../node_modules/three/build/three.module.js';

class Lights{
    constructor() {
        this.directionalLight;
        this.ambientLight;
        this._Init();
    }
    _Init(){
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        this.directionalLight.position.set(20, 100, 10);
        this.directionalLight.target.position.set(0, 0, 0);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.bias = -0.001;
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        this.directionalLight.shadow.camera.near = 0.1;
        this.directionalLight.shadow.camera.far = 500.0;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500.0;
        this.directionalLight.shadow.camera.left = 100;
        this.directionalLight.shadow.camera.right = -100;
        this.directionalLight.shadow.camera.top = 100;
        this.directionalLight.shadow.camera.bottom = -100;
       
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 4.0);
        
    }
}
export default Lights;