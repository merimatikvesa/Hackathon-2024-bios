import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Component({
    selector: 'app-modelwolf',
    template: '<div #rendererContainer></div>',
    styleUrls: ['./modelwolf.component.css']
  })
  export class ModelwolfComponent implements AfterViewInit {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  
    constructor(private rendererContainer: ElementRef) {}
  
    ngAfterViewInit(): void {
      this.init();
      this.animate();
    }
  
    private init(): void {
      // Load the OBJ model
      const loader = new OBJLoader();
      loader.load('src\\assets\\obj\\Wolf_One_obj.obj', (obj) => {
        this.scene.add(obj);
      });
  
      // Set up the renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight);
  
      // Add the renderer to the DOM
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    }
  
    private animate(): void {
      // Animation function (rotation, translation, etc.)
      requestAnimationFrame(() => this.animate());
  
      // Optional: Add animations or interactions with the 3D model
  
      // Render the scene
      this.renderer.render(this.scene, this.camera);
    }
  }