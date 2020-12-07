import * as THREE from '../node_modules/three/build/three.module.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { FPPControls } from '../controls/FPPControls.js';


let controls;
let enableControls = true;
let mixers;
let animationLoaded = false;
const clock = new THREE.Clock();
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();
var Character = function (scene, render, camera) {
    this._previousRAF = null;
    this.scene = scene;
    this.camera = camera;
    this.renderT = render;
    this.fbx = null;
    this.loadCharacter = function (path) {
        const loader = new FBXLoader();
        loader.load(path, (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });

            const params = {
                target: fbx,
            }
            fbx.scale.setScalar(0.05);


            controls = new FPPControls(fbx, this.renderT.domElement, true);
            controls.movementSpeed = 50;
            controls.lookSpeed = 0.1;
            controls.lookVertical = false;

            fbx.position.y = 0;

            fbx.receiveShadow = true;
            fbx.castShadow = true;

            this.scene.add(fbx);
            this.fbx = fbx;
        });
        console.log(this.fbx);
    }
    this.loadAnimation = function (path) {
        if (this.fbx != null) {
            const anim = new FBXLoader();
            anim.load(path, (anim) => {
                mixers = new THREE.AnimationMixer(this.fbx);
                const idle = mixers.clipAction(anim.animations[0]);
                idle.play();
            });
            console.log("defined:");
            console.log(this.fbx);
        } else {
            console.log("undefined character");
        }

    }
    this._RAF = function (path) {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._RAF(path);
            const delta = clock.getDelta();
            if (enableControls) {
                if (mixers) mixers.update(delta);
            }
            if (animationLoaded) {
            }
            if (!animationLoaded && this.fbx != null) {
                this.loadAnimation(path);
                animationLoaded = true;
            }

        });
    }
    this.animate = function (path) {
        window.requestIdleCallback(this._RAF(path));
    }
    this.handleResizeControls = function () {
        controls.handleResize();
        // controls2.handleResize();
    }

}
export { Character };
