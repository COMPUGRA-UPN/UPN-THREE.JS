import * as THREE from './node_modules/three/build/three.module.js';
import LoadScene from "./scene/evironment.js";
import FPPCamera from "./camera/FPPCamera.js";
import TPPCamera from "./camera/TPPCamera.js";
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { Character } from "./character/Character.js";
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';



//instances
let SCENE = null;
let CHARACTER = null;

// Graphics variables
let container, stats;
let camera, scene, renderer, gui;
let orbitControls
var posCameraX;
var posCameraY;
var posCameraZ;
var rotCameraX;
var rotCameraY;
var rotCameraZ;

const clock = new THREE.Clock();

// Physics variables
let collisionConfiguration;
let dispatcher;
let broadphase;
let solver;
let physicsWorld;
const dynamicObjects = [];
let transformAux1;
var cube;


Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
    init();
    window.requestIdleCallback(animate);

});
// init();
// window.requestIdleCallback(animate);
// window.requestIdleCallback(animate2);
function init() {
    container = document.getElementById("canvas");
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);


    window.addEventListener('resize', _OnWindowResize, false);


    camera = new FPPCamera(renderer);
   
    saveCamera();
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enabled = false;
    loadCamera();


    

    scene = new THREE.Scene();




    SCENE = new LoadScene(scene);

    initPhysics();

    //temporal cube
    const sx = 6;
    const sy = 6;
    const sz = 6;
    // var geometry2 = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // material.colorWrite=false;
    cube = new THREE.Mesh(new THREE.BoxBufferGeometry(sx, sy, sz, 1, 1, 1), material);
    cube.position.y = 80;
    cube.position.z = 0;

    var shape = new Ammo.btConeShape(1, sy);//radius, height
    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(10, localInertia);
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    const pos = cube.position;
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    const motionState = new Ammo.btDefaultMotionState(transform);
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(2, motionState, shape, localInertia);
    const body = new Ammo.btRigidBody(rbInfo);

    cube.userData.physicsBody = body;

    cube.receiveShadow = true;
    cube.castShadow = true;

    scene.add(cube);
    dynamicObjects.push(cube);

    physicsWorld.addRigidBody(body);

    //gui
    scene.userData.fppCamera = true;
    scene.userData.ambientLight = new THREE.Color(0x00FFFF);
    createGUI();

    //character
    CHARACTER = new Character(scene, renderer, camera, dynamicObjects, physicsWorld);
    CHARACTER.loadCharacter('./models/boy/character.fbx');
    CHARACTER._RAF('./models/boy/walk.fbx');



}
function initPhysics() {

    // Physics configuration

    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    broadphase = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, - 9.8, 0));

    // Create the terrain body

    const groundShape = SCENE.createTerrainShape();
    const groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    // Shifts the terrain, since bullet re-centers it on its bounding box.
    groundTransform.setOrigin(new Ammo.btVector3(0, (SCENE.getTerrainMaxHeight() + SCENE.getTerrainMinHeight()) / 2, 0));
    const groundMass = 0;
    const groundLocalInertia = new Ammo.btVector3(0, 0, 0);
    const groundMotionState = new Ammo.btDefaultMotionState(groundTransform);
    const groundBody = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(groundMass, groundMotionState, groundShape, groundLocalInertia));
    physicsWorld.addRigidBody(groundBody);

    transformAux1 = new Ammo.btTransform();

}
function createGUI() {

    if (gui) {

        gui.destroy();

    }

    gui = new GUI({ width: 350 });


    const graphicsFolder = gui.addFolder("Graphics");

    graphicsFolder.add(scene.userData, "fppCamera").name("FPPCamera");

    scene.userData.ambientLightRGB = [
        scene.userData.ambientLight.r * 255,
        scene.userData.ambientLight.g * 255,
        scene.userData.ambientLight.b * 255
    ];
    graphicsFolder.addColor(scene.userData, 'ambientLightRGB').name('Ambient Light').onChange(function (value) {

        scene.userData.ambientLight.setRGB(value[0], value[1], value[2]).multiplyScalar(1 / 255);

    });

    graphicsFolder.open();

}

function _OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    CHARACTER.handleResizeControls();
}
function animate() {

    requestAnimationFrame(animate);

    // const delta = clock.getDelta();

    // if (mixers) mixers.update(delta);

    // renderer.render(scene, camera);
    // controls.update(clock1.getDelta());
    // controls2.update(clock2.getDelta());
    render();


}
function animate2() {
    requestAnimationFrame(animate2);
    //    console.log("gaaaaaa");


}
function render() {

    const deltaTime = clock.getDelta();
    CHARACTER.enableControls(scene.userData.fppCamera);
    if(scene.userData.fppCamera){
        if(orbitControls.enabled){
            CHARACTER.restoreCamera(camera);
        }
        orbitControls.enabled=false;
    }else{
        orbitControls.enabled=true;
        orbitControls.update();
    }

    updatePhysics(deltaTime);

    renderer.render(scene, camera);


}

function updatePhysics(deltaTime) {

    physicsWorld.stepSimulation(deltaTime, 10);

    // Update objects
    for (let i = 0, il = dynamicObjects.length; i < il; i++) {

        const objThree = dynamicObjects[i];
        const objPhys = objThree.userData.physicsBody;
        const ms = objPhys.getMotionState();
        if (ms) {

            ms.getWorldTransform(transformAux1);
            const p = transformAux1.getOrigin();
            const q = transformAux1.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

        }

    }
}
function saveCamera(){
    posCameraX = camera.position.x;
    posCameraY = camera.position.y;
    posCameraZ = camera.position.z;
    rotCameraX = camera.rotation.x;
    rotCameraY = camera.rotation.y;
    rotCameraZ = camera.rotation.z;
}
function loadCamera(){
    camera.position.x=posCameraX;
    camera.position.y=posCameraY;
    camera.position.z=posCameraZ;
    camera.rotation.x=rotCameraX;
    camera.rotation.y=rotCameraY;
    camera.rotation.z=rotCameraZ;
}

