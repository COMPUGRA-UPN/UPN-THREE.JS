import * as THREE from '../node_modules/three/build/three.module.js';
import Lights from '../light/lights.js';

const terrainWidthExtents = 100;
const terrainDepthExtents = 100;
const terrainWidth = 128;
const terrainDepth = 128;
const terrainMaxHeight = 0;
const terrainMinHeight = 0;
let terrainMesh;
let ammoHeightData = null;
let l;
class LoadScene {
    constructor(scene,ambientLightColor,world) {
        this.scene = scene;
        this.ambientLightColor = ambientLightColor;
        this._Initialize();
        this.world=world;
    }

    _Initialize() {
        l = new Lights(this.scene,this.ambientLightColor);
        console.log(this.ambientLightColor);
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            './models/environment/resources/posx.jpg',
            './models/environment/resources/negx.jpg',
            './models/environment/resources/posy.jpg',
            './models/environment/resources/negy.jpg',
            './models/environment/resources/posz.jpg',
            './models/environment/resources/negz.jpg',
        ]);
        this.scene.background = texture;

        const material = new THREE.MeshBasicMaterial( { color: 0xfd6565, envMap: texture } );
        // const plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(100, 100, 10, 10),
        //     new THREE.MeshLambertMaterial({
        //         color: 0xF30FFF, side: THREE.DoubleSide,
        //     }));
        // plane.castShadow = false;
        // plane.receiveShadow = true;
        // plane.rotation.x = -Math.PI / 2;
        // this.scene.add(plane);
        //GROUND
    }
    updateLight(){
        l.updateLight();
    }
}

export default LoadScene;
