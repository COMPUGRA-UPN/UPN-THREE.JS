import * as THREE from '../node_modules/three/build/three.module.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { FPPControls } from '../controls/FPPControls.js';


let controls;
let controls2;
let enableControls = true;
let inMove = false;
let mixers;
var posCameraX;
var posCameraY;
var posCameraZ;
var rotCameraX;
var rotCameraY;
var rotCameraZ;
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
            controls2 = new FPPControls(this.camera, this.renderT.domElement, false);
            controls2.movementSpeed = 50;
            controls2.lookSpeed = 0.1;
            controls2.lookVertical = false;

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
            if(enableControls){
                if (mixers) mixers.update(delta);
            }


            // this.renderT.render(this.scene, this.camera);
            if (animationLoaded) {
                // console.log(this.fbx.rotation.y);
                // console.log(this.camera.rotation.y);
                if (enableControls) {
                    controls.update(clock1.getDelta());
                    controls2.update(clock2.getDelta());

                    posCameraX = this.camera.position.x;
                    posCameraY = this.camera.position.y;
                    posCameraZ = this.camera.position.z;
                    rotCameraX = this.camera.rotation.x;
                    rotCameraY = this.camera.rotation.y;
                    rotCameraZ = this.camera.rotation.z;
                }
                // this.camera.rotation.y = this.fbx.rotation.y;

            }
            if (!animationLoaded && this.fbx != null) {
                this.loadAnimation(path);
                animationLoaded = true;
            }

        });
    }
    this.moving = function (t) {
        inMove=t;
    }
    this.enableControls = function (fppcamera) {
        enableControls = fppcamera;
    }
    this.restoreCamera = function (camera) {
        camera.position.x = posCameraX;
        camera.position.y = posCameraY;
        camera.position.z = posCameraZ;
        camera.rotation.x = rotCameraX;
        camera.rotation.y = rotCameraY;
        camera.rotation.z = rotCameraZ;
    }
    this.TPPCamera = function (camera) {
        controls2 = new FPPControls(camera, this.renderT.domElement, false);
        controls2.movementSpeed = 100;
        controls2.lookSpeed = 0.1;
        controls2.lookVertical = false;
    }
    this.animate = function (path) {
        window.requestIdleCallback(this._RAF(path));
    }
    this.handleResizeControls = function () {
        controls.handleResize();
        controls2.handleResize();
    }

}
export { Character };
