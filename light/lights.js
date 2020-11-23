import * as THREE from '../node_modules/three/build/three.module.js';

class Lights{
    constructor() {
        this.directionalLight;
        this.ambientLight;
        this._Init();
    }
    _Init(){
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.6);
        this.directionalLight.position.set(-50, 200, -250);
        this.directionalLight.target.position.set(0, 0, 0);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.bias = -0.001;
        this.directionalLight.shadow.mapSize.width = 200;
        this.directionalLight.shadow.mapSize.height = 200;
        this.directionalLight.shadow.camera.near = 0.1;
        this.directionalLight.shadow.camera.far = 100.0;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 150.0;
        this.directionalLight.shadow.camera.left = 150;
        this.directionalLight.shadow.camera.right = -150;
        this.directionalLight.shadow.camera.top = 150;
        this.directionalLight.shadow.camera.bottom = -150;
       
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF,0.5);
        
    }
}
export default Lights;