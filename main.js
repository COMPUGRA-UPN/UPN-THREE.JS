
import LoadScene from "./scene/evironment.js";
import FPPCamera from "./camera/FPPCamera.js";
import TPPCamera from "./camera/TPPCamera.js";
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { Character } from "./character/Character.js";
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import CargarModelos from './models/loaders.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';

const mouse = new THREE.Vector2();
//instances
let SCENE = null;
let UPN = null;
let INTERSECTED;
var controls, time = Date.now();

// lights
let spotLight;
let ambientLight;
let poste1, poste2, poste3, poste4;
let lpabellonA, lpabellonB, lbiblioteca;
// Graphics variables
let container, stats;
let camera, scene, raycaster, renderer, gui;

const clock = new THREE.Clock();

let world;
let debugRenderer;
let timeStamp = 1.0 / 60.0;
let boxBody;
let boxCBody;
var sphereShape, sphereBody;
let bMesh;


let mixers;
var fullscreenchange;

init();
window.requestIdleCallback(animate);


// init();
// window.requestIdleCallback(animate);
// window.requestIdleCallback(animate2);
function init() {
    container = document.getElementById("canvas");
    document.body.appendChild(container);

    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', _OnWindowResize, false);
    var blocker = document.getElementById('blocker');
    var instructions = document.getElementById('instructions');

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if (havePointerLock) {

        var element = document.body;

        var pointerlockchange = function (event) {

            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                controls.enabled = true;

                blocker.style.display = 'none';

            } else {

                controls.enabled = false;

                blocker.style.display = '-webkit-box';
                blocker.style.display = '-moz-box';
                blocker.style.display = 'box';

                instructions.style.display = '';

            }

        }

        var pointerlockerror = function (event) {
            instructions.style.display = '';
        }

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

        instructions.addEventListener('click', function (event) {
            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            if (/Firefox/i.test(navigator.userAgent)) {

                fullscreenchange = function (event) {

                    if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                        document.removeEventListener('fullscreenchange', fullscreenchange);
                        document.removeEventListener('mozfullscreenchange', fullscreenchange);

                        element.requestPointerLock();
                    }

                }

                document.addEventListener('fullscreenchange', fullscreenchange, false);
                document.addEventListener('mozfullscreenchange', fullscreenchange, false);

                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                element.requestFullscreen();

            } else {

                element.requestPointerLock();

            }

        }, false);

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

    camera = new FPPCamera(renderer);
    scene = new THREE.Scene();
    //Luces
    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(205, 168, 347);
    spotLight.angle = Math.PI / 3;
    spotLight.penumbra = 0.1;
    spotLight.decay = 3;
    spotLight.distance = 600;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    scene.add(spotLight);

    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
    scene.add(ambientLight);
    //Focos
    const sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    
    poste1 = new THREE.PointLight( 0xd0d32d, 2, 50 );
    poste1.position.set(94, 49.5, 159.8);
    //poste1.castShadow=true;
    poste1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xe8dbdb } ) ) );
    scene.add( poste1 );
    
    poste2 = new THREE.PointLight( 0xd0d32d, 2, 50 );
    poste2.position.set(94, 49.5, 363.3);
    //poste2.castShadow=true;
    poste2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xe8dbdb } ) ) );
    scene.add( poste2 );
    
    poste3 = new THREE.PointLight( 0xd0d32d, 2, 50 );
    poste3.position.set(336, 49.5, 159.8);
    //poste3.castShadow=true;
    poste3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xe8dbdb } ) ) );
    scene.add( poste3 );
    
    poste4 = new THREE.PointLight( 0xd0d32d, 2, 50 );
    poste4.position.set(336, 49.5, 363.3);
    //poste4.castShadow=true;
    poste4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xe8dbdb } ) ) );
	scene.add( poste4 );

    //LuzPabellonA
    lpabellonA = new THREE.PointLight( 0xd0d32d, 2, 50 );
    lpabellonA.position.set(90, 39.5, 50);
    //lpabellonA.castShadow=true;
    lpabellonA.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xdef48a } ) ) );
    scene.add( lpabellonA );
    
    //LuzPabellonB
    lpabellonB = new THREE.PointLight( 0xd0d32d, 2, 50 );
    lpabellonB.position.set(93.5, 37.5, 523);
    //lpabellonB.castShadow=true;
    lpabellonB.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xdef48a } ) ) );
    scene.add( lpabellonB );

    //Biblioteca
    lbiblioteca = new THREE.PointLight( 0xd0d32d, 2, 50 );
    lbiblioteca.position.set(200, 39.5, 500);
    //lbiblioteca.castShadow=true;
    lbiblioteca.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xdef48a } ) ) );
    scene.add( lbiblioteca );

    //LuzAmbiente
    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(ambientLight);

    //gui
    scene.userData.fppCamera = true;
    scene.userData.poste1 = true;
    scene.userData.poste2 = true;
    scene.userData.poste3 = true;
    scene.userData.poste4 = true;
    scene.userData.lpabellonA = true;
    scene.userData.lpabellonB = true;
    scene.userData.lbiblioteca = true;



    createGUI();

    world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();


    SCENE = new LoadScene(scene, scene.userData.ambientLight, world);
    UPN = new CargarModelos(scene, world);



    let plane = new CANNON.Plane();
    let planebody = new CANNON.Body({ shape: plane, mass: 0 });
    planebody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(planebody);



    let box = new CANNON.Box(new CANNON.Vec3(3, 3, 3));
    boxBody = new CANNON.Body({ shape: box, mass: 2 });
    boxBody.position.set(5, 5, 5);
    world.addBody(boxBody);


    // let boxc = new CANNON.Box(new CANNON.Vec3(1, 4, 1));
    // boxCBody = new CANNON.Body({ shape: boxc, mass: 5 });
    // boxCBody.position.set(0,15, 0);
    // world.addBody(boxCBody);

    var mass = 200, radius = 4;
    sphereShape = new CANNON.Sphere(radius);
    sphereBody = new CANNON.Body({ mass: mass });
    sphereBody.addShape(sphereShape);
    sphereBody.position.set(0, 40, 0);
    sphereBody.linearDamping = 0.9;
    world.addBody(sphereBody);

    controls = new PointerLockControls(camera, sphereBody);
    controls.velocityFactor = 10;
    scene.add(controls.getObject());
    controls.enabled = true;


    let bGeo = new THREE.BoxGeometry(5, 5, 5);
    let bMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    bMesh = new THREE.Mesh(bGeo, bMat);
    scene.add(bMesh);


    debugRenderer = new THREE.CannonDebugRenderer(scene, world);


    function onClick(event) {
        // llamarmodalMapa();
        if (INTERSECTED != null) {
            if (INTERSECTED.name == "panel1") {
                llamarmodalMapa();
                document.exitPointerLock();
            }
            if (INTERSECTED.name == "computadora1") {
                llamarmodalCaja();
                document.exitPointerLock();
            }
            console.log("INTERSECTED: " + INTERSECTED.name);
        }

    }


    const loader = new FBXLoader();
        loader.load( 'models/secretaria/Texting.fbx', function ( object ) {

            mixers = new THREE.AnimationMixer( object );

            const action = mixers.clipAction( object.animations[ 0 ] );
            action.play();

            object.traverse( function ( child ) {

                if ( child.isMesh ) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            } );
            object.scale.setScalar(0.08);
            object.position.set(200,21,500);
            scene.add( object );

    } );

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('click', onClick, false);
}
function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // console.log(mouse);

}


function showSkeleton() {
    console.log("ASdasdasd");
}
function createGUI() {

    if (gui) {

        gui.destroy();

    }

    gui = new GUI({ width: 350 });


    const graphicsFolder = gui.addFolder("Graphics");
    var settings = {
        'show model': true,
        'show skeleton': showSkeleton,

    }
    // graphicsFolder.add(scene.userData, "fppCamera").name("FPPCamera");
    graphicsFolder.add(settings, 'show skeleton');


    const params = {
        'light color': spotLight.color.getHex(),
        Intensidad: spotLight.intensity,
        Distancia: spotLight.distance,
        Angulo: spotLight.angle,
        Penumbra: spotLight.penumbra,
        Decadencia: spotLight.decay,
        Foco: spotLight.shadow.focus,
        PosX: spotLight.position.x,
        PosY: spotLight.position.y,
        PosZ: spotLight.position.z
    };
    graphicsFolder.addColor(params, 'light color').name('Color de Iluminacion').onChange(function (val) {
        spotLight.color.setHex(val);
    });
    graphicsFolder.add(params, 'Intensidad', 0, 10).name(' Intensidad de Iluminación').onChange(function (val) {
        spotLight.intensity = val;
    });
    graphicsFolder.add(params, 'Distancia', 50, 1000).onChange(function (val) {
        spotLight.distance = val;
    });
    graphicsFolder.add(params, 'Angulo', 0, Math.PI / 2).onChange(function (val) {
        spotLight.angle = val;
    });
    graphicsFolder.add(params, 'Penumbra', 0, 1).onChange(function (val) {
        spotLight.penumbra = val;
    });
    graphicsFolder.add(params, 'Decadencia', 1, 2).onChange(function (val) {
        spotLight.decay = val;
    });
    graphicsFolder.add(params, 'Foco', 0, 1).onChange(function (val) {
        spotLight.shadow.focus = val;
    });
    graphicsFolder.add(params, 'PosX', 0, 300).onChange(function (val) {
        spotLight.position.x = val;
    });
    graphicsFolder.add(params, 'PosY', 0, 500).onChange(function (val) {
        spotLight.position.y = val;
    });
    graphicsFolder.add(params, 'PosZ', -200, 600).onChange(function (val) {
        spotLight.position.z = val;
    });
  //gui
    graphicsFolder.add(scene.userData, "poste1","poste2","poste3","poste4").name("Postes").onChange(function(val){
        poste1.intensity=val;
        poste2.intensity=val;
        poste3.intensity=val;
        poste4.intensity=val;
        val=2;
    });
    graphicsFolder.add(scene.userData, "lpabellonA","lpabellonB").name("Pabellones").onChange(function(val){
        lpabellonA.intensity=val;
        lpabellonB.intensity=val;
        val=2;
    });
    graphicsFolder.add(scene.userData, "lbiblioteca").name("Biblioteca").onChange(function(val){
        lbiblioteca.intensity=val;
        val=2;
    });

    /* const params2 = {
         'light color': ambientLight.color.getHex(),
     };
     graphicsFolder.addColor(params2, 'light color').name('Luz de Ambiente').onChange(function (val) {
         ambientLight.color.setHex(val);
     });*/
    const params2 = {
        'light color': ambientLight.color.getHex(),
        intensity: ambientLight.intensity
    };
    graphicsFolder.addColor(params2, 'light color').name('Luz Ambiental').onChange(function (val) {
        ambientLight.color.setHex(val);
    });
    graphicsFolder.add(params2, 'intensity', 0, 1.5).name(' Intensidad Luz Ambiental').onChange(function (val) {
        ambientLight.intensity = val;

    });

    graphicsFolder.open();

}

function _OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {

    requestAnimationFrame(animate);

     const delta = clock.getDelta();

    if (mixers) mixers.update(delta);

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
    world.step(timeStamp);
    controls.update(Date.now() - time);
    time = Date.now();

    bMesh.position.copy(boxBody.position);
    bMesh.quaternion.copy(boxBody.quaternion);

    debugRenderer.update();
    //const deltaTime = clock.getDelta();

    //raycaster
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        const targetDistance = intersects[0].distance;

        //camera.focusAt(targetDistance); // using Cinematic camera focusAt method

        if (INTERSECTED != intersects[0].object) {
            if (intersects[0].object.material.emissive != null) {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = intersects[0].object;
                if (INTERSECTED.name == "panel1" || INTERSECTED.name == "panel2"|| INTERSECTED.name == "computadora1") {
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0xff0000);
                }
                // console.log("Intersedted");
                // console.log(intersects[0].object);
            } else {
                // console.log("No intersedted");
                // console.log(intersects[0].object);
                // // const color2 = new THREE.Color( 0xff0000 );
                // intersects[0].object.material.color=new THREE.Color( 0x200ff );
            }
        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }

    renderer.render(scene, camera);


}
function llamarmodalCaja() {

    $('#modalCaja').modal('show'); // abrir
}
function llamarmodalBiblioteca() {

    $('#modalBiblioteca').modal('show'); // abrir
}
function llamarmodalEstructura() {

    $('#modalEstructura').modal('show'); // abrir
}
function llamarmodalPoo() {

    $('#modalPoo').modal('show'); // abrir
}
function llamarmodalMapa() {

    $('#modalMapa').modal('show'); // abrir
}

