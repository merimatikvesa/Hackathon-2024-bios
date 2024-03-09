import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ElementRef,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene;
  camera;
  mesh = null;
  controls;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createMesh();
    this.animate();
  }

  configCamera() {
    this.camera.position.set(300, 300, 300);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color(''));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  createMesh() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

  
    mtlLoader.load('assets/obj/Wolf_One_obj.mtl', (materials) => {
      objLoader.setMaterials(materials);
      console.log(objLoader.materials);

      objLoader.load('assets/obj/Wolf_One_obj.obj', (object) => {
        object.scale.set(
          window.innerWidth / 6,
          window.innerHeight / 6,
          (window.innerWidth / window.innerHeight) * 100
          );
          
        this.scene.add(object);
      });
        
    });
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
