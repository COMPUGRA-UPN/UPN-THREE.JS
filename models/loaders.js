import * as THREE from '../node_modules/three/build/three.module.js';
import {FBXLoader} from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
class CargarModelos{
    constructor(scene) {
        this.scene=scene;
        //CARGAR ESTRUCTURAS GLB (ubicacion,nombre de archivo)
        this._LoadModelGlb('./models/upn/','upnx.glb',-1,0);
        //this._LoadModelGlb('./models/upn/','Plaza.glb',-100,0);
        
        //Cargar Modelos Fbx Estaticos
        //this._LoadAnimatedModelAndPlay('./models/personajes/principal/','p_masculino.fbx','caminar.fbx', new THREE.Vector3(-16, 0, -14));
        // this._LoadAnimatedModel();
    }


    // _LoadAnimatedModel() {
    //     this._mixers = [];
    //     this._previousRAF = null;

    //     const loader = new FBXLoader();
    //     loader.setPath('./models/personajes/principal/');
    //     loader.load('p_masculino.fbx', (fbx) => {
    //       fbx.scale.setScalar(0.1);
    //       fbx.traverse(c => {
    //         c.castShadow = true;
    //       });

    //       const anim = new FBXLoader();
    //       anim.setPath('./models/personajes/principal/');
    //       anim.load('caminar.fbx', (anim) => {
    //         const m = new THREE.AnimationMixer(fbx);
    //         this._mixers.push(m);
    //         const idle = m.clipAction(anim.animations[0]);
    //         idle.play();
    //       });
    //       this.scene.add(fbx);
    //     });
    // }


    // _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    //     const loader = new FBXLoader();
    //     loader.setPath(path);
    //     loader.load(modelFile, (fbx) => {
    //       fbx.scale.setScalar(0.1);
    //       fbx.traverse(c => {
    //         c.castShadow = true;
    //       });
    //       fbx.position.copy(offset);
    
    //       const anim = new FBXLoader();
    //       anim.setPath(path);
    //       anim.load(animFile, (anim) => {
    //         const m = new THREE.AnimationMixer(fbx);
    //         this._mixers.push(m);
    //         const idle = m.clipAction(anim.animations[0]);
    //         idle.play();
    //       });
    //       this.scene.add(fbx);
    //     });
    //   }

    _LoadModelGlb(path,modelFile,posicionY,rotacionY) {
        const loader = new GLTFLoader();
        loader.setPath(path);
        loader.load(modelFile, (gltf) => {
          gltf.scene.traverse(c => {
            c.castShadow = true;
          });
          gltf.scene.translateY(posicionY);
          gltf.scene.rotateY(rotacionY);
          this.scene.add(gltf.scene);
        });
    }
}

export default CargarModelos;