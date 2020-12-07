import * as THREE from '../node_modules/three/build/three.module.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
class CargarModelos {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    //CARGAR ESTRUCTURAS GLB (ubicacion,nombre de archivo)

    this._LoadModelGlb('./models/upn/', 'upnx.glb', -1, 0);
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

  _LoadModelGlb(path, modelFile, posicionY, rotacionY) {
    // const normalMaterial = new THREE.MeshNormalMaterial();
    // const world = new Sketchbook.World('./models/upn/upnx.glb');
    let objects = [];
    const loader = new GLTFLoader();
    loader.setPath(path);


    loader.load(modelFile, (gltf) => {
      // var tree = gltf.scene.getObjectByName("Tree1");
      // this.scene.add(tree);
      
      for(let i=1;i<=12;i++){
        var escalon="escalon"+i.toString();
        objects.push(gltf.scene.getObjectByName(escalon));

      }
      for(let i=1;i<=6;i++){
        var cubo="cubo"+i.toString();
        objects.push(gltf.scene.getObjectByName(cubo));

      }
      for(let i=1;i<=4;i++){
        var descanso="descansoaa"+i.toString();
        objects.push(gltf.scene.getObjectByName(descanso));

      }
      for(let i=1;i<=4;i++){
        var a="a"+i.toString();
        objects.push(gltf.scene.getObjectByName(a));

      }
      for(let i=1;i<=13;i++){
        var piedra="piedra"+i.toString();
        objects.push(gltf.scene.getObjectByName(piedra));

      }
      console.log(objects[0]);
      // console.log(objects[1]);
      // var panel2 = gltf.scene.getObjectByName("Plano.070");
      // const parent = Muffler.parent;
      // parent.remove(Muffler);
      for (let i = 0; i < objects.length; i++) {
        this.scene.add(objects[i]);
        // this.scene.add(panel2);

        let geometry = new THREE.Geometry().fromBufferGeometry(objects[i].geometry)
        let scale = objects[i].scale;
        let vertices = [], faces = [];
        // Add vertices
        for (let i = 0; i < geometry.vertices.length; i++) {

          let x = scale.x * geometry.vertices[i].x;
          let y = scale.y * geometry.vertices[i].y;
          let z = scale.z * geometry.vertices[i].z;

          vertices.push(new CANNON.Vec3(x, y, z));
        }

        for (let i = 0; i < geometry.faces.length; i++) {

          let a = geometry.faces[i].a;
          let b = geometry.faces[i].b;
          let c = geometry.faces[i].c;

          faces.push([a, b, c]);
        }

        console.log(vertices, faces);

        let shape = new CANNON.ConvexPolyhedron(vertices, faces);

        let rigidBody = new CANNON.Body({
          mass: 0,
          shape: shape
        });
        rigidBody.position.copy(objects[i].position);
        rigidBody.quaternion.copy(objects[i].quaternion);
        this.world.addBody(rigidBody);
      }

      // console.log(geometry);
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