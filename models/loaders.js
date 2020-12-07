import * as THREE from '../node_modules/three/build/three.module.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
class CargarModelos {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    //CARGAR ESTRUCTURAS GLB (ubicacion,nombre de archivo)

    this._LoadModelGlb('./models/upn/', 'upnx.glb', 20, 0);
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
      objects.push(gltf.scene.getObjectByName("panel1"));
      objects.push(gltf.scene.getObjectByName("panel2"));
      objects.push(gltf.scene.getObjectByName("estante1"));
      objects.push(gltf.scene.getObjectByName("estante2"));
      for (let i = 1; i <= 12; i++) {
        var escalon = "escalon" + i.toString();
        objects.push(gltf.scene.getObjectByName(escalon));

      }
      for (let i = 1; i <= 6; i++) {
        var cubo = "cubo" + i.toString();
        objects.push(gltf.scene.getObjectByName(cubo));

      }
      for (let i = 1; i <= 4; i++) {
        var descanso = "descansoaa" + i.toString();
        objects.push(gltf.scene.getObjectByName(descanso));

      }
      for (let i = 1; i <= 5; i++) {
        var a = "a" + i.toString();
        objects.push(gltf.scene.getObjectByName(a));

      }
      for (let i = 1; i <= 13; i++) {
        var piedra = "piedra" + i.toString();
        objects.push(gltf.scene.getObjectByName(piedra));

      }
      for (let i = 1; i <= 24; i++) {
        var p = "p" + i.toString();
        var pared = gltf.scene.getObjectByName(p);
        pared.rotation.y = 9.425;
        if (pared.type == "Mesh") {
          objects.push(pared);
        } else {
          console.log(pared);
          this.scene.add(pared);
        }
      }
      for (let i = 1; i <= 10; i++) {
        var p = "g" + i.toString();
        var pared = gltf.scene.getObjectByName(p);
        if (pared.type == "Mesh") {
          objects.push(pared);
        } else {
          console.log(pared);
          this.scene.add(pared);
        }
      }
      objects.push(gltf.scene.getObjectByName("plaza"));
      for (let i = 1; i <= 6; i++) {
        var p = "piso" + i.toString();
        var pared = gltf.scene.getObjectByName(p);
        if (pared.type == "Mesh") {
          objects.push(pared);
        } else {
          console.log(pared);
          this.scene.add(pared);
        }
      }
      objects.push(gltf.scene.getObjectByName("pisob1"));
      objects.push(gltf.scene.getObjectByName("computadora1"));
      objects.push(gltf.scene.getObjectByName("cajita1"));
      objects.push(gltf.scene.getObjectByName("sofa1"));
      for (let i = 1; i <= 5; i++) {
        var p = "mesa" + i.toString();
        var pared = gltf.scene.getObjectByName(p);
        if (pared.type == "Mesh") {
          objects.push(pared);
        } else {
          console.log(pared);
          this.scene.add(pared);
        }
      }
      // for (let i = 1; i <= 5; i++) {
      //   var p = "libro" + i.toString();
      //   var pared = gltf.scene.getObjectByName(p);
      //   if (pared.type == "Mesh") {
      //     objects.push(pared);
      //   } else {
      //     console.log(pared);
      //     this.scene.add(pared);
      //   }
      // }


      for (let i = 0; i < objects.length; i++) {
        objects[i].position.y=objects[i].position.y+posicionY;
        this.scene.add(objects[i]);
        var position = objects[i].position;
        var quaternion = objects[i].quaternion;
        // this.scene.add(panel2);

        // if(objects[i].type=="Mesh")
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

        // console.log(vertices, faces);

        let shape = new CANNON.ConvexPolyhedron(vertices, faces);

        let rigidBody = new CANNON.Body({
          mass: 0,
          shape: shape
        });

        rigidBody.position.copy(position);
        rigidBody.quaternion.copy(quaternion);
        this.world.addBody(rigidBody);
        // console.log(objects[i]);
      }

      // console.log(geometry);
      gltf.scene.traverse(c => {
        c.castShadow = true;
      });
      gltf.scene.translateY(posicionY);
      gltf.scene.rotateY(rotacionY);
      this.scene.add(gltf.scene);

      console.clear();
    });
  }
}

export default CargarModelos;