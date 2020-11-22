import * as THREE from './node_modules/three/build/three.module.js';
import LoadScene from "./scene/evironment.js";
import FPPCamera from "./camera/FPPCamera.js";
import { FBXLoader } from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {FPPControls} from './controls/FPPControls.js';
let APP = null;
let SCENE = null;
let ORBIT_CAMERA = null;
let controls;
let controls2;
const clock = new THREE.Clock();
const clock2 = new THREE.Clock();

class Main {
    constructor() {
        this._Init();
    }
    _Init() {
        this._threejs = new THREE.WebGLRenderer();
        this._threejs.shadowMap.enabled = true;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);


        this._camera = new FPPCamera();


        this._scene = new THREE.Scene();

        // ORBIT_CAMERA = new OrbitCamera(this._camera, this._threejs, 0, 20, 0);
        const params = {
            target: this._camera,
        }
        // this._controls = new FPPControls(params);wada


        SCENE = new LoadScene(this._scene);

        this._previousRAF = null;
        this._LoadAnimatedModel();
        this._RAF();

    }
    _LoadAnimatedModel() {
        const loader = new FBXLoader();
        loader.setPath('./models/boy/');
        loader.load('character.fbx', (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });

            const params = {
                target: fbx,
                camera: this._camera,
            }
            controls = new FPPControls(fbx, this._threejs.domElement, true);
            controls.movementSpeed = 100;
            controls.lookSpeed = 0.1;
            controls.lookVertical = false;
            controls2 = new FPPControls(this._camera, this._threejs.domElement, false);
            controls2.movementSpeed = 100;
            controls2.lookSpeed = 0.1;
            controls2.lookVertical = false;

            // const anim = new FBXLoader();
            // anim.setPath('./resources/zombie/');
            // anim.load('walk.fbx', (anim) => {
            //   const m = new THREE.AnimationMixer(fbx);
            //   this._mixers.push(m);
            //   const idle = m.clipAction(anim.animations[0]);
            //   idle.play();
            // });
            this._scene.add(fbx);
        });
    }
    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
        this.controls.handleResize();
        this.controls2.handleResize();
    }
    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._RAF();

            this._threejs.render(this._scene, this._camera);
            this._Step(t - this._previousRAF);
            this._previousRAF = t;
        });
        this.render();
    }
    _Step(timeElapsed) {
        const timeElapsedS = timeElapsed * 0.001;
        if (this._mixers) {
            this._mixers.map(m => m.update(timeElapsedS));
        }

        if (this._controls) {
            this._controls.Update(timeElapsedS);
        }
    }
    render() {

        controls.update(clock.getDelta());
        controls2.update(clock2.getDelta());
        this._threejs.render(this._scene, this._camera);

    }
}


window.addEventListener('DOMContentLoaded', () => {
    APP = new Main();
});