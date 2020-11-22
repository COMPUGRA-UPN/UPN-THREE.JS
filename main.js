import * as THREE from './node_modules/three/build/three.module.js';
import LoadScene from "./scene/evironment.js";
import FPPCamera from "./camera/FPPCamera.js";
import { FBXLoader } from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { FPPControls } from './controls/FPPControls.js';
import {Character} from "./character/Character.js";

let APP = null;
let SCENE = null;
let CHARACTER = null;
let ORBIT_CAMERA = null;
let controls;
let controls2;
let camera, scene, renderer
let mixers;
let previousRAF = null;
let c=0;
const clock = new THREE.Clock();
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();

init();
// window.requestIdleCallback(animate);
window.requestIdleCallback(animate2);
// console.log("gaaaa");

function init() {
    const container = document.getElementById("canvas");
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);


    window.addEventListener('resize', _OnWindowResize, false);


    camera = new FPPCamera();


    scene = new THREE.Scene();

    // ORBIT_CAMERA = new OrbitCamera(camera, this._threejs, 0, 20, 0);
    const params = {
        target: camera,
    }
    // this._controls = new FPPControls(params);wada


    SCENE = new LoadScene(scene);
    
    // _LoadAnimatedModel();
    CHARACTER = new Character(scene, camera, renderer);
    CHARACTER.loadCharacter('./models/boy/character.fbx');
    // CHARACTER.loadAnimation('./models/boy/walk.fbx');
    CHARACTER._RAF('./models/boy/walk.fbx');

    
    


}
function _OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    CHARACTER.handleResizeControls();
}

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixers) mixers.update(delta);

    renderer.render(scene, camera);
    // controls.update(clock1.getDelta());
    controls2.update(clock2.getDelta());
    

}
function animate2() {
    requestAnimationFrame(animate2);
//    console.log("gaaaaaa");
    

}

