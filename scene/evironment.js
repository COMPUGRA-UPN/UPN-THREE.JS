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
class LoadScene {
    constructor(scene) {
        this.scene = scene;
        this.heightData=this.generateHeight();
        this._Initialize();
    }

    _Initialize() {
        let l = new Lights();
        this.scene.add(l.directionalLight);
        this.scene.add(l.ambientLight);
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '../models/environment/resources/posx.jpg',
            '../models/environment/resources/negx.jpg',
            '../models/environment/resources/posy.jpg',
            '../models/environment/resources/negy.jpg',
            '../models/environment/resources/posz.jpg',
            '../models/environment/resources/negz.jpg',
        ]);
        this.scene.background = texture;
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshLambertMaterial({
                color: 0x202020, side: THREE.DoubleSide,
            }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        // this.scene.add(plane);
        //GROUND
        const geometry = new THREE.PlaneBufferGeometry(terrainWidthExtents, terrainDepthExtents, terrainWidth - 1, terrainDepth - 1);
        geometry.rotateX(- Math.PI / 2);

        const vertices = geometry.attributes.position.array;

        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {

            // j + 1 because it is the y component that we modify
            vertices[j + 1] = this.heightData[i];

        }

        geometry.computeVertexNormals();

        const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xC7C7C7 });
        terrainMesh = new THREE.Mesh(geometry, groundMaterial);
        terrainMesh.receiveShadow = true;
        terrainMesh.castShadow = true;

        this.scene.add(terrainMesh);
    }
    generateHeight() {

        // Generates the height data (a sinus wave)

        const size = terrainWidth * terrainDepth;
        const data = new Float32Array(size);

        const hRange = terrainMaxHeight - terrainMinHeight;
        const w2 = terrainWidth / 2;
        const d2 = terrainDepth / 2;
        const phaseMult = 12;

        let p = 0;

        for (let j = 0; j < terrainDepth; j++) {

            for (let i = 0; i < terrainWidth; i++) {

                const radius = Math.sqrt(
                    Math.pow((i - w2) / w2, 2.0) +
                    Math.pow((j - d2) / d2, 2.0));

                const height = (Math.sin(radius * phaseMult) + 1) * 0.5 * hRange + terrainMinHeight;

                data[p] = height;

                p++;

            }

        }

        return data;
    }
    createTerrainShape() {

        // This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
        const heightScale = 1;

        // Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
        const upAxis = 1;

        // hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
        const hdt = "PHY_FLOAT";

        // Set this to your needs (inverts the triangles)
        const flipQuadEdges = false;

        // Creates height data buffer in Ammo heap
        ammoHeightData = Ammo._malloc(4 * terrainWidth * terrainDepth);

        // Copy the javascript height data array to the Ammo one.
        let p = 0;
        let p2 = 0;

        for (let j = 0; j < terrainDepth; j++) {

            for (let i = 0; i < terrainWidth; i++) {

                // write 32-bit float data to memory
                Ammo.HEAPF32[ammoHeightData + p2 >> 2] = this.heightData[p];

                p++;

                // 4 bytes/float
                p2 += 4;

            }

        }

        // Creates the heightfield physics shape
        const heightFieldShape = new Ammo.btHeightfieldTerrainShape(
            terrainWidth,
            terrainDepth,
            ammoHeightData,
            heightScale,
            terrainMinHeight,
            terrainMaxHeight,
            upAxis,
            hdt,
            flipQuadEdges
        );

        // Set horizontal scale
        const scaleX = terrainWidthExtents / (terrainWidth - 1);
        const scaleZ = terrainDepthExtents / (terrainDepth - 1);
        heightFieldShape.setLocalScaling(new Ammo.btVector3(scaleX, 1, scaleZ));

        heightFieldShape.setMargin(0.05);

        return heightFieldShape;

    }
    getTerrainMaxHeight() {
        return terrainMaxHeight;
    }
    getTerrainMinHeight() {
        return terrainMinHeight;
    }
}

export default LoadScene;
