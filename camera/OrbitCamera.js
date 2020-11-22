import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
class OrbitCamera {
    constructor(camera,render,x,y,z) {
        this.camera=camera;
        this.render=render;
        this.x=x;
        this.y=y;
        this.z=z;
        this._init();
    }
    _init() {
        const controls = new OrbitControls(
            this.camera, this.render.domElement);
        controls.target.set(this.x, this.y, this.z);
        controls.update();
    }
}
export default OrbitCamera;